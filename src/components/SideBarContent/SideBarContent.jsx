import styles from "./SideBarContent.module.scss";
import React from "react";
import { Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  newMainMenuList,
  newMainMenuListIRA,
  othersSideMenu,
  FLOW_TYPES,
  ROUTES,
  MANAGE_WORK_FLOW_ROUTES,
} from "@/utils/constants/common";

import { getPathWithParam } from "@/utils/helpers";
import { Link } from "react-router";
import tenantConfig from "../../mocks/tenantOne.json";
import { camelCase, get, isEmpty, startCase } from "lodash-es";
import AddToolTip from "../AddToolTip/AddToolTip";
import { useContext } from "react";
import { appLayoutStore } from "../../contexts";
import coreIcon from "../../assets/svg/core.svg";
import { useEffect, useState } from "react";
import { getTenantCoBrandingLogo } from "../../services/home";

const SideBarContent = ({ selectedMenu, role, user }) => {
  const [logoURL, setLogoURL] = useState("");
  const [isLogoLoading, setIsLogoLoading] = useState(true);

  useEffect(() => {
    const fetchTenantCoBrandingLogo = async () => {
      try {
        const response = await getTenantCoBrandingLogo();

        if (response?.isSuccessful) {
          const coBrandingLogoUrl = response?.coBrandingLogoUrl;
          setLogoURL(coBrandingLogoUrl?.trim() ? coBrandingLogoUrl : coreIcon);
        } else {
          setLogoURL(coreIcon);
        }
      } catch (error) {
        console.error("Failed to load tenant co-branding logo", error);
        setLogoURL(coreIcon);
      } finally {
        setIsLogoLoading(false);
      }
    };

    fetchTenantCoBrandingLogo();
  }, []);

  const { state } = useContext(appLayoutStore);

  const permissions = get(state, "permissions", {});
  const userRoleMenuList = othersSideMenu.filter(
    (e) =>
      tenantConfig["menuItems"]?.includes(camelCase(e.name)) &&
      !isEmpty(permissions) &&
      permissions["menuItems"][camelCase(e.name)]?.includes("R")
  );
  var selectedItem = userRoleMenuList?.find((e) =>
    e.menuList.includes(selectedMenu)
  );

  if (
    role?.includes("Admin") &&
    selectedItem?.name.includes("workFlowManagement")
  ) {
    selectedItem.route = ROUTES.WORK_FLOW_DASHBOARD;
  }
  if (
    !role?.includes("Admin") &&
    selectedItem?.name.includes("workFlowManagement")
  ) {
    selectedItem.route = `${ROUTES.WORK_FLOW}/${MANAGE_WORK_FLOW_ROUTES.PAYROLL}`;
  }
  const getRouteForEmployees = (route) => {
    if (user?.role === "PARTICIPANT" && parseInt(user?.ProfileId))
      return getPathWithParam({
        path: `${ROUTES.MANAGE_CENSUS}/employee-information`,
        pathParam: [FLOW_TYPES.EDIT, user?.ProfileId],
      });
    return route;
  };
  const menuListToUse =
    state.appUsage === "IRA" ? newMainMenuListIRA : newMainMenuList;
  return (
    <div className="d-flex sidebar-content flex-column">
      <div className="minimized-content flex-fill min-h-0">
        <span className="core-icon">
          {!isLogoLoading && (
            <Image src={logoURL} width="43.28px" height="16px" />
          )}
        </span>
        <div className="menu-icons">
          {menuListToUse.map((e, i) => {
            const selected = e.menuList.includes(selectedMenu)
              ? "selected"
              : "unselected";

            return (
              tenantConfig["menuItems"]?.includes(camelCase(e.name)) &&
              !isEmpty(permissions) &&
              permissions["menuItems"][camelCase(e.name)]?.includes("R") &&
              e.name != "Others" && (
                <Link
                  key={e.name || i}
                  to={
                    e.name == "Employees"
                      ? getRouteForEmployees(e.route)
                      : e.route
                  }
                  className={`menu-icons-content ${selected}`}
                >
                  <FontAwesomeIcon
                    icon={e.icon}
                    className="menu-icons-defined-size"
                  />
                  {e.label === "IRA Processing" ? (
                    <span
                      className={`${styles.sidebarcontent} menu-font-size text-nowrap`}
                    >
                      IRA
                      <br />
                      Processing
                    </span>
                  ) : (
                    <span className="menu-font-size text-nowrap">
                      {startCase(e.label)}
                    </span>
                  )}
                </Link>
              )
            );
          })}
          {selectedItem && userRoleMenuList?.length > 1 && (
            <Link
              key={selectedItem.name || "selectedItem"}
              to={`/${selectedItem.route}`}
              className={`menu-icons-content ${
                selectedItem ? "selected" : "unselected"
              }`}
            >
              <FontAwesomeIcon
                icon={selectedItem.icon}
                className="menu-icons-defined-size"
              />
              <span className="menu-font-size ">
                {startCase(selectedItem.label.length) <= 10 ? (
                  startCase(selectedItem.label)
                ) : (
                  <AddToolTip
                    name={startCase(selectedItem.label)}
                    placement="right"
                  >
                    {startCase(selectedItem.label).slice(0, 10)}...
                  </AddToolTip>
                )}
              </span>
            </Link>
          )}
          {menuListToUse.map((e, i) => {
            const selected = e.menuList.includes(selectedMenu)
              ? "selected"
              : "unselected";
            return (
              tenantConfig["menuItems"]?.includes(camelCase(e.name)) &&
              !isEmpty(permissions) &&
              permissions["menuItems"][camelCase(e.name)]?.includes("R") &&
              e.name == "Others" && (
                <Link
                  key={e.name || i}
                  to={e.route}
                  className={`menu-icons-content ${selected}`}
                >
                  <FontAwesomeIcon
                    icon={e.icon}
                    className="menu-icons-defined-size"
                  />
                  <span className="menu-font-size text-nowrap">
                    {startCase(e.label)}
                  </span>
                </Link>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;
