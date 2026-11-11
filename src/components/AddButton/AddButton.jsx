import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { camelCase, get, isEmpty } from "lodash-es";
import { appLayoutStore } from "../../contexts";

const AddButton = ({
  label,
  onAddClick,
  disabled,
  menu,
  subMenu,
  size,
  testId,
}) => {
  const { state } = useContext(appLayoutStore);
  var isAllowed;
  const permissions = get(state, "permissions", {});

  if (menu) {
    isAllowed = subMenu
      ? !isEmpty(permissions) &&
        permissions[menu + "SubMenu"][camelCase(subMenu)].includes("C")
      : !isEmpty(permissions) && permissions["menuItems"][menu].includes("C");
  } else {
    isAllowed = true;
  }
  return (
    isAllowed && (
      <Button
        onClick={onAddClick}
        className={`core-button-flair ${size}`}
        variant="primary"
        disabled={disabled}
        data-testid={testId}
      >
        {label ? label : "Add"}
      </Button>
      // <button
      //   type="button"
      //   className="add-icon"
      //   onClick={onAddClick}
      //   disabled={disabled}
      // >
      //   <FontAwesomeIcon icon={faPlusSquare} size="lg" />
      // </button>
    )
  );
};

export default AddButton;
