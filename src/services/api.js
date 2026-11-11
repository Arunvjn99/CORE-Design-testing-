import axios from "axios";
import { get, isEmpty } from "lodash-es";
import { apiDetails } from "./helpers";
import AppConfig from "./../config/AppConfig";
import { ApplicationPaths } from "../components/api-authorization/ApiAuthorizationConstants";
import { AuthorizeService } from "../components/api-authorization/AuthorizeService";
import {
  emitNetworkError,
  emitNetworkRestored,
  isInternetDisconnectedError,
} from "./error/errorBus";

function createAPIInstance() {
  const tokenKey = window.localStorage.getItem(
    `${AppConfig.get("VITE_CLIENTID")}user:${AppConfig.get(
      "VITE_AUTHENTICATION_BASE_URL"
    )}:${AppConfig.get("VITE_CLIENTID")}`
  );
  let authToken = get(JSON.parse(tokenKey), "access_token");
  const tokenHeader = {
    Authorization: `Bearer ${authToken}`,
    mode: "no-cors",
  };

  const dateTransformer = (data) => {
    if (
      data instanceof FormData ||
      data instanceof File ||
      data instanceof Blob
    ) {
      return data;
    }
    if (data instanceof Date) {
      // do your specific formatting here
      return data.toLocaleString("en-US");
    }
    if (Array.isArray(data)) {
      return data.map((val) => dateTransformer(val));
    }
    if (typeof data === "object" && data !== null && !isEmpty(data)) {
      // IMPORTANT: Use Object.getOwnPropertyNames() instead of Object.entries()
      // because Object.entries() doesn't include non-enumerable properties like 'prototype'
      const result = {};
      const keys = Object.getOwnPropertyNames(data);

      for (const key of keys) {
        result[key] = dateTransformer(data[key]);
      }
      // Also check for enumerable properties that might not be own properties
      for (const key in data) {
        if (!result.hasOwnProperty(key)) {
          result[key] = dateTransformer(data[key]);
        }
      }

      return result;
    }
    return data;
  };

  const api = axios.create({
    baseURL: apiDetails.baseUrl.trim(),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      ...tokenHeader,
    },
    transformRequest: [dateTransformer].concat(axios.defaults.transformRequest),
  });
  api.interceptors.request.use(async (config) => {
    const authService = new AuthorizeService();
    const user = await authService.getUser();
    config.headers["Default-Product-Id"] =
      window.localStorage.getItem("defaultProductId") ||
      user?.["defaultTenantProduct"] ||
      "";
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  });

  api.interceptors.request.use(async (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  });
  api.interceptors.response.use(
    (response) => {
      const errorResponse = get(response, "data.result.error", {});
      if (!isEmpty(errorResponse)) {
        throw errorResponse;
      }
      if (typeof window !== "undefined" && window.__isNetworkOffline) {
        emitNetworkRestored();
      }
      return response.data;
    },
    (error) => {
      if (error && error.response && error.response.status === 401) {
        window.location = `${AppConfig.get("VITE_URL")}/${
          ApplicationPaths.Login
        }`;
        return null;
      }
      if (isInternetDisconnectedError(error)) {
        emitNetworkError();
      }

      return Promise.reject(error);
    }
  );
  return api;
}

export default createAPIInstance;
