import axios from "axios";
import { get, isEmpty } from "lodash-es";
import { apiDetails } from "./helpers";
import AppConfig from "../config/AppConfig";
import { ApplicationPaths } from "../components/api-authorization/ApiAuthorizationConstants";
import {
  emitNetworkError,
  emitNetworkRestored,
  isInternetDisconnectedError,
} from "./error/errorBus";

function createFileAPIInstance(returnFullResponse = false) {
  const tokenKey = window.localStorage.getItem(
    `${AppConfig.get("VITE_CLIENTID")}user:${AppConfig.get(
      "VITE_AUTHENTICATION_BASE_URL"
    )}:${AppConfig.get("VITE_CLIENTID")}`
  );
  let authToken = get(JSON.parse(tokenKey), "access_token");

  const tokenHeader = {
    Authorization: `Bearer ${authToken}`,
  };

  const dateTransformer = (data) => {
    if (data instanceof Date) {
      // do your specific formatting here
      return data.toLocaleString("en-US");
    }
    if (Array.isArray(data)) {
      return data.map((val) => dateTransformer(val));
    }
    if (typeof data === "object" && data !== null && !isEmpty(data)) {
      return Object.fromEntries(
        Object.entries(data).map(([key, val]) => [key, dateTransformer(val)])
      );
    }
    return data;
  };

  const fileApi = axios.create({
    baseURL: apiDetails.baseUrl.trim(),
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/json", //"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ...tokenHeader,
    },
    transformRequest: [dateTransformer].concat(axios.defaults.transformRequest),
  });

  fileApi.interceptors.response.use(
    (response) => {
      const errorResponse = get(response, "data.result.error", {});
      if (!isEmpty(errorResponse)) {
        throw errorResponse;
      }
      if (typeof window !== "undefined" && window.__isNetworkOffline) {
        emitNetworkRestored();
      }
      return returnFullResponse ? response : response.data;
    },
    (error) => {
      if (error && error.response && error.response.status === 401) {
        window.location = ApplicationPaths.Login;
        return null;
      }
      if (isInternetDisconnectedError(error)) {
        emitNetworkError();
      }
      return Promise.reject(error);
    }
  );
  return fileApi;
}

export default createFileAPIInstance;
