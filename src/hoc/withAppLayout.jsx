import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { get, isEmpty } from "lodash-es";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import {
  appLayoutStore,
  setPadNumber,
  setPermissions,
  setSelectedMenu,
  setUser,
  setUserRole,
} from "../contexts";
import authService from "../components/api-authorization/AuthorizeService";
import { getMenuPermissions } from "@/services/home";
import { getPadNumber } from "@/services/home";
import { useLocation } from "react-router";
import { Outlet } from "react-router";
import {
  checkAccess,
  FLOW_TYPES,
  extractBaseRouteIdentifier,
  checkRouteAccess,
} from "@/auth-helpers/auth-permissions";
import Error from "../layouts/Error/Error";
import AppConfig from "../config/AppConfig";
import NetworkErrorModal from "../components/NetworkError/NetworkErrorToast";

// const allowedIRARoles = [
//   "ADMINISTRATOR",
//   "IRA SUPERVISOR",
//   "AUDITOR",
//   "IRA SPECIALIST",
//   "TRADING SPECIALIST",
// ];

// Function to render content based on permissions and path
const renderAuthorizedContent = (
  permissions,
  pathname,
  flowType = FLOW_TYPES.VIEW
) => {
  // Skip permission check for authentication paths and home
  if (
    pathname.includes("/authentication") ||
    pathname === "/" ||
    pathname === "/home"
  ) {
    return <Outlet />;
  }

  // If no permissions loaded yet, return Outlet (will be handled by parent loading logic)
  if (!permissions) {
    return <Outlet />;
  }

  // Extract base route for permission checking
  const baseRoute = extractBaseRouteIdentifier(pathname);

  // Check if user has access to the base route with the specified flow type
  const hasPageAccess = checkAccess(permissions, baseRoute, flowType);

  return hasPageAccess ? <Outlet /> : <Error />;
};

// Enhanced function that can be used by other components with different flow types
export const renderContentWithFlow = (permissions, pathname, flowType) => {
  return renderAuthorizedContent(permissions, pathname, flowType);
};

// Smart render function that auto-detects flow type
export const renderSmartAuthorizedContent = (
  permissions,
  pathname,
  search = ""
) => {
  // Use the comprehensive route access checker
  const hasPageAccess = checkRouteAccess(permissions, pathname, null, search);

  // Skip permission check for authentication paths and home
  if (
    pathname.includes("/authentication") ||
    pathname === "/" ||
    pathname === "/home"
  ) {
    return <Outlet />;
  }

  // If no permissions loaded yet, return Outlet (will be handled by parent loading logic)
  if (!permissions) {
    return <Outlet />;
  }

  return hasPageAccess ? <Outlet /> : <Error />;
};

export function PersistentAppLayoutContainer({ children }) {
  const location = useLocation();
  const { state, dispatch } = useContext(appLayoutStore);

  const isPadNumber = AppConfig.get("VITE_PADNUMBER") === "true";
  const shouldRenderFooter = AppConfig.get("VITE_FOOTER") === "true";

  const getRole = async () => {
    const user = await authService.getUser();
    let role = user?.role || "SPU";
    const permissions = await getMenuPermissions(role);
    dispatch(setPermissions(permissions));

    if (isPadNumber) {
      try {
        const padNumbers = await getPadNumber();
        dispatch(setPadNumber(padNumbers));
      } catch (e) {
        console.error(e);
      }
    }

    dispatch(setUserRole(role));
    dispatch(setUser(user));

    // if (allowedIRARoles.includes(role)) {
    //   dispatch(setAppUseage("IRA"));
    //   dispatch(setSelectedMenu(location.pathname.split("/")[1]));
    // }
  };

  // Run only once
  useEffect(() => {
    getRole();
  }, []);

  // Update menu on location change
  useEffect(() => {
    dispatch(setSelectedMenu(location.pathname.split("/")[1]));
  }, [location]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return () => {};
    }

    const hasWindow = typeof window !== "undefined";
    const root = document.documentElement;
    const resetFooterHeight = () =>
      root.style.setProperty("--footer-height", "0px");

    if (!shouldRenderFooter) {
      resetFooterHeight();
      return () => {};
    }

    const footerSelector = "[data-app-footer]";
    const getFooter = () => document.querySelector(footerSelector);
    let footerElement = getFooter();

    const updateFooterHeight = () => {
      footerElement = getFooter();
      const height = footerElement?.offsetHeight || 0;
      root.style.setProperty("--footer-height", `${height}px`);
    };

    updateFooterHeight();

    if (hasWindow && window.ResizeObserver && footerElement) {
      const resizeObserver = new ResizeObserver(updateFooterHeight);
      resizeObserver.observe(footerElement);
      return () => {
        resizeObserver.disconnect();
        resetFooterHeight();
      };
    }

    if (hasWindow) {
      window.addEventListener("resize", updateFooterHeight);
      return () => {
        window.removeEventListener("resize", updateFooterHeight);
        resetFooterHeight();
      };
    }

    return () => {
      resetFooterHeight();
    };
  }, [shouldRenderFooter, location.pathname, state?.padnumbers]);

  if (isEmpty(get(state, "userRole"))) {
    return null; // or a loader
  }

  console.log("AppLayout state: ", state);

  return (
    <>
      <NetworkErrorModal />
      <Sidebar state={state}>
        <Header seletedRoute={get(state, "selectedMenu")} />
        <Container className="app-layout" fluid>
          {children}
          {renderSmartAuthorizedContent(
            get(state, "permissions"),
            location.pathname,
            location.search
          )}
        </Container>
        {shouldRenderFooter && (
          <Footer
            padNumber={get(state, "padnumbers")}
            pathname={location.pathname}
          />
        )}
      </Sidebar>
    </>
  );
}

export default function withAppLayout(PageComponent) {
  return PageComponent;
}
