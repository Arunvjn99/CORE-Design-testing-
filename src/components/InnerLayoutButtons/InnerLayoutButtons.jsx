import React from "react";
import { NavLink } from "react-router";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "@/components/AddButton";
import DropdownAsButton from "@/components/DropdownAsButton";
import { camelCase, get, isEmpty } from "lodash-es";
import { useContext } from "react";
import { appLayoutStore } from "../../contexts";
const InnerLayoutButtons = ({
  buttonsList = [],
  flow,
  fields,
  dirty,
  menu,
  subMenu,
  page,
}) => {
  const { state } = useContext(appLayoutStore);
  const permissions = get(state, "permissions", {});
  const subMenuItem =
    !isEmpty(permissions) &&
    permissions[menu + "SubMenu"]?.[camelCase(subMenu)];
  const buttons = buttonsList?.map(
    (
      {
        label,
        icon,
        isAddButton,
        isEmpty,
        isDropdown,
        noPaddingDelete = false,
        size = "md",
        islastButton,
        ...item
      },
      index
    ) => {
      if (item.flow && !item.flow.includes(flow)) {
        return null;
      }
      if (page == "mapper" && label == "Next" && (subMenuItem || "") == "R") {
        return null;
      }
      const isAllowed = () => {
        if (icon.iconName === "trash-alt") {
          return (subMenuItem || "").includes("D") ? true : false;
        } else if (icon.iconName === "pencil-alt") {
          return (subMenuItem || "").includes("U") ? true : false;
        } else if (isAddButton) {
          return (subMenuItem || "").includes("C") ? true : false;
        } else if (icon.iconName === "times") {
          return true;
        } else {
          return true;
        }
      };
      const isLastButton =
        islastButton != undefined
          ? islastButton
          : buttonsList.length - 1 === index;
      const getButton = () => {
        if (isDropdown) {
          return <DropdownAsButton label={label} {...item} />;
        }
        if (isEmpty) {
          return (
            <div key={`button-${index}`} className="px-5 mx-4">
              &nbsp;
            </div>
          );
        }
        if (isAddButton) {
          return (
            <AddButton
              size={size}
              menu={menu}
              subMenu={subMenu}
              key={`button-${index}`}
              onAddClick={item.onClick}
            />
          );
        }
        if (icon) {
          return (
            isAllowed() && (
              <Button
                key={`button-${index}`}
                {...item}
                variant={
                  item.variant === "danger" ? "" : item.variant ?? "link"
                }
                className={`${
                  noPaddingDelete ? "noPaddingDelete" : "inner-layout-actions"
                } core-button-flair ${size} ${
                  item.variant === "danger" ? "danger-tertiary-btn" : ""
                } ${item.className ?? ""}`}
              >
                <FontAwesomeIcon
                  icon={icon}
                  color={
                    item.variant === "danger"
                      ? "currentColor"
                      : "var(--neutral-text-default)"
                  }
                  style={{
                    // fontSize: "1.5rem",
                    marginRight: noPaddingDelete ? "4px" : "",
                    pointerEvents: "none",
                    ...(item.style ?? {}),
                  }}
                />
                {label ? label : ""}
              </Button>
            )
          );
        } else if (
          (subMenuItem || "").includes("C") &&
          ["Add", "Confirm"].includes(label)
        ) {
          return (
            <Button
              key={`button-${index} `}
              className={`nolabelTransform fs-14px fw-600 core-button-flair ${size}`}
              {...item}
            >
              {label}
            </Button>
          );
        } else if (
          (subMenuItem || "") == "R" &&
          [
            "Save",
            "Edit",
            "Add",
            "Delete",
            "Add Trustee",
            "Add Investment",
            "Create Library",
            "Add Eligibility Rule(s)",
            "Add Trustee",
            "Add Investment",
            "Add Beneficiary",
            "Add Company",
            "Add custodian",
            "Add Service Provider",
            "Add holiday",
            "Add Eligibility Rule(s)",
            "Add Advisor",
            "Add Contact",
            "ADD CUSTODIAN",
            "Add Compensation",
            "Create Compensation",
            "Create Specification",
            "Create Plan",
            "Create plan group",
            "Create library/Add",
            "Create Report",
            "Create Dividend",
            "modify Loan",
            "Modify Loan",
            "New Rebalance Request",
            "New E-Mail Layout",
            "New Fund Switch",
            "New Admin Group",
            "Create User",
            "New Advisor",
            "New investment",
            "New Custodian",
            "New Trustee",
            "New request",
            "New Sources",
            "New Restriction",
            "New Adjustment",
            "New Fee Reversal",
            "New Communication",
            "Confirm funds",
            "New Contribution Reversal",
            "New Dividend Reversal",
            "Waive Off",
            "Update Payment Status",
            "Manual Confirm",
            "Reinitiate",
            "Close",
            "Edit",
            "Upload document",
          ].includes(label)
        ) {
          return null;
        } else if (
          (subMenuItem || "").includes("U") &&
          ["Save", "Edit", "Confirm"].includes(label)
        ) {
          return (
            <Button
              key={`button-${index} `}
              className={`nolabelTransform fs-14px fw-600 core-button-flair ${size}`}
              {...item}
            >
              {label}
            </Button>
          );
        } else if (
          ((subMenuItem || "").includes("D") && ["Delete"].includes(label)) ||
          (item.overridePermission ?? false)
        ) {
          return (
            <Button
              key={`button-${index} `}
              className={`nolabelTransform fs-14px fw-600 core-button-flair ${size}`}
              {...item}
            >
              {label}
            </Button>
          );
        } else if (
          [
            "Add Trustee",
            "Add Investment",
            "Add Beneficiary",
            "Add Company",
            "Add Alternate Payee",
            "Approve",
            "Add Clearing Partner",
            "Add custodian",
            "Add Service Provider",
            "Add holiday",
            "Add Eligibility Rule(s)",
            "Add Advisor",
            "Add Contact",
            "ADD CUSTODIAN",
            "Add Compensation",
            "Back",
            "back",
            "Back to review",
            "Cancel",
            "Create Specification",
            "Create Plan",
            "Create plan group",
            "Create library/Add",
            "Continue Later",
            "Create Report",
            "Create Compensation",
            "Close",
            "Create Dividend",
            "Extend",
            "File based",
            "Generate",
            "Go Back to Custom Report List",
            "modify Loan",
            "Modify Loan",
            "Manual",
            "Reinitiate Trade",
            "Awaiting Disbursement Confirmation",
            "Cancel Trade",
            "Next",
            "New Rebalance Request",
            "Send",
            "New E-Mail Layout",
            "New Fund Switch",
            "New Admin Group",
            "Create User",
            "New Advisor",
            "New investment",
            "New Custodian",
            "New Trustee",
            "New request",
            "New Sources",
            "New Restriction",
            "New Adjustment",
            "New Fee Reversal",
            "New Communication",
            "New Ad hoc Communication",
            "Previous",
            "Proceed",
            "Process",
            "Resume",
            "Reject",
            "submit",
            "Submit",
            "Submit without Funding",
            "Save",
            "Save as Draft",
            "save as draft",
            "Save As Draft",
            "Save as draft",
            "Save & Proceed",
            "Upload",
            "Create SSP",
            "Upload document",
            "Confirm funds",
            "New Contribution Reversal",
            "New Dividend Reversal",
            "Waive Off",
            "Bulk upload",
            "Download Template",
            "Manual Confirm",
            "Reinitiate",
            "Close",
          ].includes(label)
        ) {
          return (
            <Button
              key={`button-${index} `}
              className={`nolabelTransform fs-14px fw-600 core-button-flair ${size}`}
              {...item}
            >
              {label}
            </Button>
          );
        } else {
          return (
            item.disabled &&
            label != "" && (
              <Button
                disabled
                key={`button-${index}`}
                {...item}
                className={`cursor-not-allowed ${`core-button-flair ${size}`}`}
              >
                {label}
              </Button>
            )
          );
        }
      };
      const button = getButton();
      if (!button) {
        return null;
      }
      if (item.link) {
        return [
          <NavLink key={`button-${index}`} replace to={item.link}>
            {button}
          </NavLink>,
          !isLastButton && <>&nbsp;&nbsp;&nbsp;</>,
        ];
      }
      return [button, !isLastButton && <>&nbsp;&nbsp;&nbsp;</>];
    }
  );

  return (
    <div className={page == "Loan Summary" ? "ml-2 d-flex" : "ml-2"}>
      {buttons}
    </div>
  );
};

export default InnerLayoutButtons;
