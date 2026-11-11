import React from "react";
import { get } from "lodash-es";
import SideBarContent from "../SideBarContent";

const SidebarApp = (props) => {
  const { children, state } = props;
  return (
    <div className={`sidebar-container`}>
      <div className={`sidebar bg-color-layer1`}>
        <SideBarContent
          selectedMenu={get(state, "selectedMenu")}
          role={get(state, "userRole")}
          user={get(state, "user")}
        />
      </div>
      <div className="sidebar-app">{children}</div>
    </div>
  );
};
export default SidebarApp;
