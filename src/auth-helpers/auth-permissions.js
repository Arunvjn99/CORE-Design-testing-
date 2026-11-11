// import { PLAN_CONFIG } from "./adminactors/src/api/Actions/Utils";

import { get } from "lodash-es";
import { ROUTE_PERMISSION_LOOKUP } from "./route-permission-lookup";

export const getNestedProperty = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

// Flow types for different user actions
export const FLOW_TYPES = {
  ADD: "add",
  EDIT: "edit",
  SAVE: "save",
  VIEW: "view",
};

/**
 * Maps flow types to CRUDS operations
 * @param {string} flowType - The flow type (ADD, EDIT, SAVE, VIEW)
 * @returns {string} - The corresponding CRUDS operation
 */
export const mapFlowToOperation = (flowType) => {
  const flowOperationMap = {
    [FLOW_TYPES.ADD]: "C", // Create
    [FLOW_TYPES.EDIT]: "R",
    [FLOW_TYPES.SAVE]: "U", // Update (save is typically an update operation)
    [FLOW_TYPES.VIEW]: "R", // Read
  };

  return flowOperationMap[flowType] || "R"; // Default to Read if flow type not found
};

/**
 * Enhanced function to check access based on flow type
 * @param {object} userPermissions - The full permissions object from the API response
 * @param {string} routeIdentifier - The frontend route path (resolved constant)
 * @param {string} flowType - The flow type (ADD, EDIT, SAVE, VIEW)
 * @returns {boolean} - True if access is granted, false otherwise
 */
export const hasAccessByFlow = (userPermissions, routeIdentifier, flowType) => {
  const requiredOperation = mapFlowToOperation(flowType);
  return hasAccess(userPermissions, routeIdentifier, requiredOperation);
};

/**
 * Comprehensive access checker that accepts either flow type or direct operation
 * @param {object} userPermissions - The full permissions object from the API response
 * @param {string} routeIdentifier - The frontend route path (resolved constant)
 * @param {string|object} accessType - Either a flow type string or an object with {operation: 'C/R/U/D/S', flowType: 'add/edit/save/view'}
 * @returns {boolean} - True if access is granted, false otherwise
 */
export const checkAccess = (userPermissions, routeIdentifier, accessType) => {
  if (typeof accessType === "string") {
    // Check if it's a flow type
    if (Object.values(FLOW_TYPES).includes(accessType)) {
      return hasAccessByFlow(userPermissions, routeIdentifier, accessType);
    }
    // Otherwise treat it as a direct operation
    return hasAccess(userPermissions, routeIdentifier, accessType);
  }

  if (typeof accessType === "object") {
    // If flowType is provided, use it
    if (accessType.flowType) {
      return hasAccessByFlow(
        userPermissions,
        routeIdentifier,
        accessType.flowType
      );
    }
    // Otherwise use the operation
    if (accessType.operation) {
      return hasAccess(userPermissions, routeIdentifier, accessType.operation);
    }
  }

  // Default to read access if nothing is specified
  return hasAccess(userPermissions, routeIdentifier, "R");
};

/**
 * Determines flow type from route pathname by examining path segments
 * @param {string} pathname - The route pathname
 * @param {string} searchParams - Optional query parameters
 * @returns {string} - The determined flow type
 */
export const determineFlowTypeFromRoute = (pathname, searchParams = "") => {
  // Split pathname into segments to check for specific patterns
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);

  // Check for exact flow type matches first (higher priority)
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];

    // Check for add/create patterns
    if (segment === "add" || segment === "create" || segment === "new") {
      return FLOW_TYPES.ADD;
    }

    // Check for edit/update patterns (can be followed by ID)
    if (segment === "edit" || segment === "update" || segment === "view") {
      return FLOW_TYPES.EDIT;
    }

    // Check for save pattern
    if (segment === "save") {
      return FLOW_TYPES.SAVE;
    }
  }

  // Check for flow keywords within menu items/submenus (lower priority)
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];

    // Check for add/create patterns within segment names
    if (
      segment.includes("add-") ||
      segment.includes("-add") ||
      segment.includes("create-") ||
      segment.includes("-create") ||
      segment.includes("new-") ||
      segment.includes("-new")
    ) {
      return FLOW_TYPES.ADD;
    }

    // Check for edit/update patterns within segment names
    if (
      segment.includes("edit-") ||
      segment.includes("-edit") ||
      segment.includes("update-") ||
      segment.includes("-update") ||
      segment.includes("manage-") ||
      segment.includes("-manage")
    ) {
      return FLOW_TYPES.EDIT;
    }

    // Check for save patterns within segment names
    if (segment.includes("save-") || segment.includes("-save")) {
      return FLOW_TYPES.SAVE;
    }
  }

  // Check query parameters as fallback
  if (searchParams) {
    const urlParams = new URLSearchParams(searchParams);
    const mode = urlParams.get("mode") || urlParams.get("action");
    if (mode === "add" || mode === "create") return FLOW_TYPES.ADD;
    if (mode === "edit" || mode === "update") return FLOW_TYPES.EDIT;
    if (mode === "save") return FLOW_TYPES.SAVE;
  }

  return FLOW_TYPES.VIEW; // Default to view
};

/**
 * Extracts the base route identifier (before flow type) for permission checking
 * @param {string} pathname - The full route pathname
 * @returns {string} - The base route identifier without flow type and parameters
 */
export const extractBaseRouteIdentifier = (pathname) => {
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);
  const baseSegments = [];

  // Build route until we hit a flow type or ID (numeric or UUID/GUID)
  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];

    // Stop if we encounter exact flow type matches (not part of menu names)
    if (
      segment === "add" ||
      segment === "create" ||
      segment === "new" ||
      segment === "edit" ||
      segment === "update" ||
      segment === "save" ||
      segment === "view"
    ) {
      break;
    }

    // Stop if we encounter what looks like an ID (numeric, UUID/GUID, or alphanumeric)
    if (
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/.test(segment) ||
      /^\d+$/.test(segment) ||
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        segment
      )
    ) {
      break;
    }

    // Include all other segments, even if they contain flow keywords as part of menu names
    // This handles cases like 'add-sponsor', 'edit-employee', 'manage-plan'
    baseSegments.push(segment);
  }

  return "/" + baseSegments.join("/");
};

/**
 * Analyzes URL segments to identify flow keywords within menu items
 * @param {string} pathname - The route pathname
 * @returns {object} - Analysis result with flow type and context
 */
export const analyzeMenuFlowKeywords = (pathname) => {
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);
  const analysis = {
    hasFlowKeywords: false,
    detectedFlow: FLOW_TYPES.VIEW,
    keywordSegments: [],
    exactFlowMatches: [],
    menuItemFlowMatches: [],
  };

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];

    // Check for exact flow matches
    if (segment === "add" || segment === "create" || segment === "new") {
      analysis.exactFlowMatches.push({
        segment,
        index: i,
        flow: FLOW_TYPES.ADD,
      });
      analysis.detectedFlow = FLOW_TYPES.ADD;
      analysis.hasFlowKeywords = true;
    } else if (segment === "edit" || segment === "update") {
      analysis.exactFlowMatches.push({
        segment,
        index: i,
        flow: FLOW_TYPES.EDIT,
      });
      analysis.detectedFlow = FLOW_TYPES.EDIT;
      analysis.hasFlowKeywords = true;
    } else if (segment === "save") {
      analysis.exactFlowMatches.push({
        segment,
        index: i,
        flow: FLOW_TYPES.SAVE,
      });
      analysis.detectedFlow = FLOW_TYPES.SAVE;
      analysis.hasFlowKeywords = true;
    }

    // Check for flow keywords within menu items
    else if (
      segment.includes("add-") ||
      segment.includes("-add") ||
      segment.includes("create-") ||
      segment.includes("-create") ||
      segment.includes("new-") ||
      segment.includes("-new")
    ) {
      analysis.menuItemFlowMatches.push({
        segment,
        index: i,
        flow: FLOW_TYPES.ADD,
      });
      if (!analysis.hasFlowKeywords) {
        analysis.detectedFlow = FLOW_TYPES.ADD;
        analysis.hasFlowKeywords = true;
      }
    } else if (
      segment.includes("edit-") ||
      segment.includes("-edit") ||
      segment.includes("update-") ||
      segment.includes("-update") ||
      segment.includes("manage-") ||
      segment.includes("-manage")
    ) {
      analysis.menuItemFlowMatches.push({
        segment,
        index: i,
        flow: FLOW_TYPES.EDIT,
      });
      if (!analysis.hasFlowKeywords) {
        analysis.detectedFlow = FLOW_TYPES.EDIT;
        analysis.hasFlowKeywords = true;
      }
    } else if (segment.includes("save-") || segment.includes("-save")) {
      analysis.menuItemFlowMatches.push({
        segment,
        index: i,
        flow: FLOW_TYPES.SAVE,
      });
      if (!analysis.hasFlowKeywords) {
        analysis.detectedFlow = FLOW_TYPES.SAVE;
        analysis.hasFlowKeywords = true;
      }
    }
  }

  analysis.keywordSegments = [
    ...analysis.exactFlowMatches,
    ...analysis.menuItemFlowMatches,
  ];

  return analysis;
};

/**
 * Enhanced access checker that auto-detects flow type from route
 * @param {object} userPermissions - The full permissions object from the API response
 * @param {string} fullRoute - The complete frontend route path including flow and IDs
 * @param {string} searchParams - Optional query parameters for flow detection
 * @returns {boolean} - True if access is granted, false otherwise
 */
export const hasAccessByRoute = (
  userPermissions,
  fullRoute,
  searchParams = ""
) => {
  const baseRouteIdentifier = extractBaseRouteIdentifier(fullRoute);
  const flowType = determineFlowTypeFromRoute(fullRoute, searchParams);
  return hasAccessByFlow(userPermissions, baseRouteIdentifier, flowType);
};

/**
 * Comprehensive access checker that handles both base routes and full routes
 * @param {object} userPermissions - The full permissions object from the API response
 * @param {string} route - Either a base route or full route path
 * @param {string|object} accessConfig - Flow type, operation, or config object
 * @param {string} searchParams - Optional query parameters for flow detection
 * @returns {boolean} - True if access is granted, false otherwise
 */
export const checkRouteAccess = (
  userPermissions,
  route,
  accessConfig,
  searchParams = ""
) => {
  let baseRoute = route;
  let flowOrOperation = accessConfig;
  // If accessConfig is not provided, try to auto-detect from route
  if (!accessConfig) {
    baseRoute = extractBaseRouteIdentifier(route);
    flowOrOperation = determineFlowTypeFromRoute(route, searchParams);
  }

  // If the route contains flow indicators, extract base route
  if (
    route.includes("/edit/") ||
    route.includes("/add/") ||
    route.includes("/create/") ||
    route.includes("/save/") ||
    route.includes("/new/")
  ) {
    baseRoute = extractBaseRouteIdentifier(route);
    if (!accessConfig) {
      flowOrOperation = determineFlowTypeFromRoute(route, searchParams);
    }
  }

  return checkAccess(userPermissions, baseRoute, flowOrOperation);
};

/**
 * Checks if the user has the required operation permission for a given route based on API response structure.
 * @param {object} userPermissions - The full permissions object from the API response.
 * @param {string} routeIdentifier - The frontend route path (resolved constant).
 * @param {string} requiredOperation - The operation required ('R', 'C', 'U', 'D', 'S').
 * @returns {boolean} - True if access is granted, false otherwise.
 */
export const hasAccess = (
  userPermissions,
  routeIdentifier,
  requiredOperation
) => {
  if (!userPermissions || !routeIdentifier || !requiredOperation) {
    return false;
  }

  let permissionMapping = ROUTE_PERMISSION_LOOKUP[routeIdentifier];
  let apiMenuType, apiMenuKey;

  if (!permissionMapping) {
    // Route not explicitly mapped, check if we can derive from subpaths
    const pathSegments = routeIdentifier
      .split("/")
      .filter((segment) => segment);

    // If there are no segments, we can't derive permissions, deny access
    if (pathSegments.length === 0) {
      return false;
    }
    if (pathSegments.length >= 2) {
      // Convert first segment to camelCase for apiMenuType
      apiMenuType = pathSegments[0].replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      apiMenuType = `${apiMenuType}SubMenu`;
      let rawKey = `${pathSegments[1]}`;
      // Convert kebab-case to camelCase (e.g., plan-config -> planConfig)
      apiMenuKey = rawKey.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
    } else {
      apiMenuType = "menuItems";
      // Convert kebab-case to camelCase (e.g., plan-config -> planConfig)
      apiMenuKey = pathSegments[0].replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
    }
  } else {
    ({ apiMenuType, apiMenuKey } = permissionMapping); // If route is mapped, use the defined API menu type and key
  }

  const permissionsString = get(
    userPermissions,
    `${apiMenuType}.${apiMenuKey}`,
    null
  );
  if (!permissionsString) {
    // No permission string found in API response for this item, deny access
    return false;
  }

  return permissionsString.includes(requiredOperation);
};

/**
 * Resolves menu route
 * Handles:
 * 1. Absolute routes
 * 2. Relative routes
 */
export const resolveMenuRoute = ({ baseRoute = "", path = "" }) => {
  if (!path) {
    return "";
  }

  // already absolute
  if (path.startsWith("/")) {
    return path;
  }

  // relative path
  return `${baseRoute}/${path}`;
};

// Removes leading slashes
const normalizeRoute = (route = "") => route.replace(/^\/+/, "");

// Checks whether route has read access
export const hasRoutePermission = ({ permissions, route }) => {
  return hasAccess(permissions, route, "R");
};

/**
 * Returns first accessible route from menu list
 * Priority:
 * 1. Child menus
 * 2. Parent menu
 */
export const getFirstAccessibleMenuRoute = ({
  permissions,
  menus = [],
  baseRoute = "",
}) => {
  const getAccessibleRoute = (menu) => {
    if (!menu?.path) {
      return null;
    }

    const resolvedRoute = resolveMenuRoute({
      baseRoute,
      path: menu.path,
    });

    const hasAccessPermission = hasRoutePermission({
      permissions,
      route: resolvedRoute,
    });

    return hasAccessPermission ? normalizeRoute(resolvedRoute) : null;
  };

  for (const menu of menus) {
    // Child menu priority
    if (menu?.childMenus?.length) {
      for (const childMenu of menu.childMenus) {
        const accessibleChildRoute = getAccessibleRoute(childMenu);

        if (accessibleChildRoute) {
          return accessibleChildRoute;
        }
      }
    }

    // Parent menu fallback
    const accessibleParentRoute = getAccessibleRoute(menu);

    if (accessibleParentRoute) {
      return accessibleParentRoute;
    }
  }

  return null;
};
