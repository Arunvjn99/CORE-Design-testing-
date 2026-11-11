import { getTenantConfig } from "@/services/tenant/tenantConfigService";

/**
 * Normalize pathname to screen key
 */
export function normalizePageKey(pathname = "") {
  if (!pathname) return "";

  let cleanPath = pathname.split("?")[0].split("#")[0].trim();

  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(cleanPath)) {
    try {
      cleanPath = new URL(cleanPath).pathname;
    } catch (error) {
      return "";
    }
  }

  const segments = cleanPath
    .split("/")
    .filter(Boolean)
    .filter((segment) => !/^\d+$/.test(segment));

  if (!segments.length) return "";

  const flowSegments = new Set([
    "add",
    "create",
    "new",
    "edit",
    "update",
    "save",
    "view",
  ]);

  // Find the index of the first flow segment
  const flowIndex = segments.findIndex((segment) =>
    flowSegments.has(segment.toLowerCase())
  );

  // If flow segment found, return everything before it
  // Otherwise return all segments joined
  if (flowIndex > 0) {
    return segments.slice(0, flowIndex).join("/");
  }

  return segments.join("/");
}

/**
 * Get field configuration by LABEL
 * Priority: screenConfig > globalConfig > defaults
 * Auto-detects screenKey from URL if not provided
 */
export const getFieldConfig = (screenKey, defaults = {}) => {
  const label = defaults.label;

  if (!label) return defaults;

  const tenantConfig = getTenantConfig();

  // Auto-detect screenKey from current URL if not provided
  const resolvedScreenKey =
    screenKey ||
    (typeof window !== "undefined"
      ? normalizePageKey(window.location.pathname)
      : "");

  // Lookup by label only (O(1) lookups)
  const globalConfig = tenantConfig.global?.[label];
  const screenConfig = tenantConfig.screens?.[resolvedScreenKey]?.[label];

  if (!globalConfig && !screenConfig) {
    return defaults;
  }

  return {
    ...defaults,
    ...(globalConfig || {}),
    ...(screenConfig || {}),
  };
};
