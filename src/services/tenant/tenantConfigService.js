import createAPIInstance from "../api";
import defaultConfig from "@/config/content.json";
import { tenant } from "../endpoints/tenant";
import AppConfig from "@/config/AppConfig";

/**
 * Tenant Config Service
 *
 * Fetches tenant-specific content configuration from the API.
 * Some tenants customize field labels/visibility via a JSON file in storage.
 * If the tenant has no config file, the API returns null/empty and we fall back
 * to the default (empty) config.
 *
 * Call `initTenantConfig()` once after user is authenticated (e.g. in MainRoutes).
 * Use `getTenantConfig()` anywhere to read the cached config.
 */

let tenantConfig = defaultConfig;
let isInitialized = false;
let initPromise = null;

/**
 * Fetch the tenant content config from the API.
 * Should be called once after successful authentication.
 * Safe to call multiple times — subsequent calls return the same promise.
 */
export const initTenantConfig = () => {
  if (initPromise) return initPromise;

  initPromise = fetchTenantConfig();
  return initPromise;
};

async function fetchTenantConfig() {
  try {
    let response;

    if (AppConfig.get("NODE_ENV") === "development") {
      const res = await fetch(
        `http://localhost:4000/${tenant.GetTenantConfigJson}`
      );
      response = await res.json();
    } else {
      const api = createAPIInstance();
      response = await api.get(tenant.GetTenantConfigJson);
    }

    if (
      response &&
      typeof response === "object" &&
      Object.keys(response).length > 0
    ) {
      tenantConfig = response;
    }
    // If response is null/empty/undefined, keep the default config
  } catch (error) {
    // Silently fall back to default config if API fails
    // (tenant may not have a config file — this is expected)
  } finally {
    isInitialized = true;
  }

  return tenantConfig;
}

/**
 * Get the current tenant config (cached).
 * Returns the fetched config if available, otherwise the default.
 */
export const getTenantConfig = () => tenantConfig;

/**
 * Check if the tenant config has been fetched.
 */
export const isTenantConfigReady = () => isInitialized;

export const onTenantConfigReady = (callback) => {
  if (isInitialized) {
    callback();
  } else {
    initTenantConfig().then(callback);
  }
};
