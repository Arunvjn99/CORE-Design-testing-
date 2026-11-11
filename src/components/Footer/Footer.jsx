import React from "react";
import styles from "./Footer.module.scss";
import { extractBaseRouteIdentifier } from "@/auth-helpers/auth-permissions";
import { ROUTE_PERMISSION_LOOKUP } from "@/auth-helpers/route-permission-lookup";
import AppConfig from "../../config/AppConfig";

// Helper function to get apiMenuKey based on URL
const getApiMenuKeyFromUrl = (pathname) => {
  const baseRoute = extractBaseRouteIdentifier(pathname);
  const permissionMapping = ROUTE_PERMISSION_LOOKUP[baseRoute];
  return permissionMapping?.apiMenuKey || null;
};

const Footer = ({ padNumber, pathname }) => {
  // Check if PAD number feature is enabled
  const isPadNumberEnabled = AppConfig.get("VITE_PADNUMBER") === "true";

  // Get apiMenuKey based on current URL
  const apiMenuKey = getApiMenuKeyFromUrl(pathname);

  // Function to get PAD number based on apiMenuKey
  const getPadNumberByApiMenuKey = (apiKey, padNumbers) => {
    if (!padNumbers || !apiKey) return null;
    console.log(
      "Pad Numbers:",
      apiKey,
      padNumbers.find((x) => x.menuName === apiKey)?.padNumbers
    );
    return padNumbers.find((x) => x.menuName === apiKey)?.padNumbers || null;
  };

  const displayPadNumber = isPadNumberEnabled
    ? getPadNumberByApiMenuKey(apiMenuKey, padNumber)
    : null;
  console.log("Display Pad Number:", displayPadNumber, apiMenuKey, padNumber);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-app-footer>
      {/* Left side - Copyright */}
      <div className="core-body-text-large-bold">
        <span>
          © {currentYear} Congruent Solutions, Inc. All Rights Reserved.
        </span>
      </div>

      {/* Right side - PAD Number and Links */}
      <div className={styles.rightSection}>
        {displayPadNumber && (
          <span className="core-body-text-large-bold">
            PAD No:{displayPadNumber}
          </span>
        )}
        <div className={styles.verticalDivider}></div>
        <div className={styles.linksContainer}>
          <a href="#" className="core-body-text-large-bold-bd">
            Legal
          </a>
          <a href="#" className="core-body-text-large-bold-bd">
            Resources
          </a>
          <a href="#" className="core-body-text-large-bold-bd">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
