import styles from "./DropdownAsButton.module.scss";
import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import AddToolTip from "../AddToolTip/AddToolTip";

const DropdownAsButton = ({
  label,
  variant,
  options,
  onClick,
  disabled,
  size,
  divider = true,
}) => {
  return (
    <DropdownButton
      title={label}
      align="end"
      variant={variant}
      id="dropdown-menu-align-end"
      className={`${
        styles["w-144px"]
      } ${`request-dropdown core-button-flair ${size}`}`}
      disabled={disabled}
    >
      {options.map((data) => (
        <>
          {divider && <Dropdown.Divider />}
          {data.disabled ? (
            <AddToolTip name={data.message}>
              <div className={`pr-3 pl-3 grey-text cursor-not-allowed`}>
                {data.label}
              </div>
            </AddToolTip>
          ) : (
            <Dropdown.Item
              onClick={(evt) => {
                !data.disabled ? onClick(data.value) : evt.preventDefault();
              }}
              // disabled={data.disabled}
            >
              {/* <Link
              to={getPathWithParam({
                path: data.path,
                pathParam: data.pathParam,
              })}
            > */}
              {data.label}
              {/* </Link> */}
            </Dropdown.Item>
          )}
        </>
      ))}
    </DropdownButton>
  );
};

export default DropdownAsButton;
