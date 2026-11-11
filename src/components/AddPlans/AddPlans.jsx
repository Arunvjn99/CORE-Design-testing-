import React from "react";
import { Button } from "react-bootstrap";
import Link from "@/components/Link";
import { camelCase, get, isEmpty } from "lodash-es";
import { useContext } from "react";
import { appLayoutStore } from "../../contexts";
const AddPlans = ({
  buttonstyle,
  menu,
  subMenu,
  content,
  buttonLabel,
  link,
  className,
  disabled,
  secondaryButtonLabel,
  secondaryButtonLink,
  secondaryDisabled,
  onPrimaryClick,
  onSecondaryClick,
  errorMessage,
  showError,
  errorList,
  style = {},
}) => {
  var isAllowed;
  const { state } = useContext(appLayoutStore);
  const permissions = get(state, "permissions", {});

  if (menu) {
    isAllowed = subMenu
      ? (!isEmpty(permissions) &&
          permissions[menu + "SubMenu"][camelCase(subMenu)]?.includes("C")) ||
        (!isEmpty(permissions) &&
          permissions[menu + "SubMenu"][camelCase(subMenu)]?.includes("U"))
      : !isEmpty(permissions) && permissions["menuItems"][menu]?.includes("C");
  } else {
    isAllowed = true;
  }

  return (
    <div
      className={`add-module-items d-flex align-items-center justify-content-start h-75 bg-white ${className} add-items`}
      style={{ ...style }}
    >
      <div className="pl-3r pr-5 pt-4 pb-4">
        <div className="core-heading-regular mb-2">{content}</div>
        <div className="d-flex">
          {isAllowed && secondaryButtonLabel && (
            <>
              <Link
                to={secondaryButtonLink}
                disabled={secondaryDisabled}
                className="no-underline"
              >
                <Button
                  type="button"
                  variant="secondary"
                  disabled={secondaryDisabled}
                  onClick={onSecondaryClick}
                  className=""
                >
                  {secondaryButtonLabel}
                  {errorList?.marketTimingRule}
                </Button>
              </Link>
              &nbsp;&nbsp;&nbsp;
            </>
          )}

          {isAllowed && buttonLabel && (
            <Link to={link} disabled={disabled} className="no-underline">
              <Button
                className={`${buttonstyle} `}
                type="button"
                disabled={disabled}
                onClick={onPrimaryClick}
              >
                {buttonLabel}
              </Button>
            </Link>
          )}
        </div>
        <div className={`critical-text-color`}>
          {errorList?.marketTimingRule}
        </div>
        {showError && (
          <div className="invalid-feedback d-block">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default AddPlans;
