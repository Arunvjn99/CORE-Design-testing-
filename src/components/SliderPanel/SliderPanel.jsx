import styles from "./SliderPanel.module.scss";
import React, { useState } from "react";
import SlidingPane from "react-sliding-pane";
import { faTimes, faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown } from "react-bootstrap";
import PayrollFileName from "../PayrollFileName";
import ButtonWithIcon from "../ButtonWithIcon/ButtonWithIcon";
import ToggleOn from "../../assets/svg/toggle-on.svg?react";
import ToggleOff from "../../assets/svg/toggle-off.svg?react";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";

const SliderPanel = ({
  showRetrigger = false,
  onRetrigger,
  isToggleDisabled,
  isToggleOn,
  setIsToggleOn = () => {},
  isOpen,
  className = "",
  children,
  type = "right",
  onClose,
  showCancel = true,
  backdropClicked,
  screen,
  showEdit = false,
  customDisabled = false,
  onEdit,
  showSave = false,
  onSave,
  showCancelButton = false,
  isMapper = false,
  isPlanConversion = false,
  showBackButton = false,
  showDeleteButton = false,
  onDelete,
  showHeader = true,
  hideSliderHeader = false,
  header = "",
  headerClass = "",
  showSeparator = false,
  showSeparatorSlider = false,
  lineSeparator = false,
  separatorDisplay = false,
  showAdd = false,
  onAddClick,
  isSaveDisabled,
  flair = "",
  pageSubmit = "",
  isRkaas = false,
  customButton = false,
  customButtonLabel = "",
  customButtonOnRight = false,
  onCustomClick,
  onClickDisconnect,
  disableDisconnect = false,
  disconnectDisable = false,
  fileName = "",
  showRecords = false,
  recordText = "",
  // showTitle= true,
  isCT = false,
  buttonWithIcon = false,
  buttonType,
  buttonData,
  buttonwithIconClassName,
  onClickButtonWithIcon,
  width = "80%",
  buttonsFinch,
  customButtonDisabled,
  customClassName = "",
  customVariant = "primary",
  sliderChildrenClass = "",
}) => {
  const sliderClass =
    screen === "add_investment_portfolio"
      ? "p-0px"
      : screen == "Payroll-Emp-Classification-Slider"
      ? "pl-16px"
      : screen === "plan-group"
      ? "plan-group-slider-content"
      : screen === "NotesManager"
      ? "notes-slider-content"
      : screen === "vesting-slider"
      ? "slider-content sliderPad-16 cursor-style mt-20"
      : "slider-content sliderPad-16 cursor-style";

  const beginningClass =
    screen === "add_investment_portfolio" ||
    screen === "Deposit-History-Contributions"
      ? ""
      : screen === "Rkaas"
      ? "pl-30 pt-10px align-items-baseline mt-10"
      : screen === "NotesManager"
      ? "p-1r"
      : screen == "Mapper-Overview-Clone-Profile"
      ? ""
      : screen == "Payroll-Emp-Classification-Slider" ||
        screen == "Buy/Sell Details"
      ? "pb-1 pl-3 pr-3 pt-1r-line-2dot2"
      : header != "" || screen == "PlanEnrollmentInvestment"
      ? screen === "sliding-pane-padding-1"
        ? "sliderPad-16 sliding-pane-p-0"
        : "sliderPad-16"
      : "";
  const sliderCloseButtonClass =
    screen === "Rkaas" ? "slider-close-button-Rkaas" : "slider-close-button";
  const [isPopOpen, setIsPopOpen] = useState(false);
  const dropdownToggle = () => {
    setIsPopOpen(!isPopOpen);
  };
  return (
    <SlidingPane
      isOpen={isOpen}
      from={type}
      hideHeader={hideSliderHeader || showHeader}
      // className="custom-sliding-pane CSpannel"
      className={`custom-sliding-pane CSpannel ${
        screen === "Buy/Sell Details"
          ? "mpsliderp-0"
          : screen === "sliding-pane-padding-1"
          ? "sliding-pane-padding-10"
          : screen
      }`}
      onRequestClose={backdropClicked}
      width={width}
      overlayClassName={flair}
    >
      {showHeader && (
        <div className={`${beginningClass} slider-header-background`}>
          <div
            className={`${className} d-flex flex-row align-items-center justify-content-between
            `}
          >
            <div className="d-flex align-items-center">
              <div
                className={`d-flex ${
                  showRecords ? "flex-direction-column" : "align-items-center"
                } ${headerClass ? headerClass : `core-page-titles`}`}
              >
                <div>{header}</div>{" "}
                {showRecords && (
                  <div className="d-flex ">
                    <div className="metadata-label">{showRecords?.length}</div>
                    <div className="metadata-label ml-4p">{recordText}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex flex-row flex-nowrap slider-button-group justify-content-between gap-15">
              {showBackButton === true ? (
                <div className="slider-back-button" onClick={onClose}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span className="slider-back-label">Back</span>
                </div>
              ) : null}
              {showDeleteButton === true ? (
                <div className="slider-delete-button mr-20px core-mt-8 cursor-style">
                  <Button className="" variant="danger" onClick={onDelete}>
                    Delete
                  </Button>
                  {/* <FontAwesomeIcon icon={faTrashAlt} /> Delete */}
                </div>
              ) : null}
              {buttonWithIcon && (
                <ButtonWithIcon
                  type={buttonType}
                  onButtonClick={() => {
                    onClickButtonWithIcon();
                  }}
                  buttonData={buttonData}
                  className={
                    buttonwithIconClassName ||
                    "core-body-text-regular-bold-primary mr-2"
                  }
                />
              )}
              {screen === "FinchViewDetails" ? (
                <div className={`g-14px d-flex`}>
                  <div className="d-flex flex-row mr-1 align-items-center">
                    <div className="core-body-text-regular-semi-bold-sl">
                      Stop Data Pull
                    </div>
                    {isToggleOn ? (
                      <ToggleOn
                        aria-label="Toggle On"
                        className={`toggle-button ml-2 ${
                          isToggleDisabled
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        style={{
                          color: "var(--brand-background-primary-strong)",
                        }}
                        onClick={() => {
                          if (!isToggleDisabled) {
                            setIsToggleOn(!isToggleOn);
                          }
                        }}
                      />
                    ) : (
                      <ToggleOff
                        aria-label="Toggle Off"
                        className={`toggle-button ml-2 ${
                          isToggleDisabled
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        onClick={() => {
                          if (!isToggleDisabled) {
                            setIsToggleOn(!isToggleOn);
                          }
                        }}
                      />
                    )}
                  </div>

                  <Dropdown
                    align={{ lg: "end" }}
                    onToggle={dropdownToggle}
                    className="mt-2"
                  >
                    <Dropdown.Toggle
                      className={`bg-color-layer1 drop-fee-btn `}
                      id="dropdown-basic"
                      align={{ lg: "start" }}
                    >
                      <div>
                        {" "}
                        {"Actions"} &nbsp;
                        <FontAwesomeIcon icon={faChevronDown} />
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className={`min-w-170px p-16px arrow-fee-drop dropdown-basic-fee ml-2`}
                    >
                      {buttonsFinch.map((each, ind) => (
                        <div key={ind}>
                          {ind === buttonsFinch.length - 1 && (
                            <Dropdown.Divider />
                          )}
                          <div
                            className={` ${
                              disableDisconnect && "cursor-not-allowed "
                            } d-flex align-items-center cursor-pointer mb-2`}
                            onClick={
                              disableDisconnect ? undefined : each.onClick
                            }
                          >
                            <FontAwesomeIcon
                              icon={each.icon}
                              size="xs"
                              className={`${each.className || ""}`}
                              style={{
                                color: disableDisconnect
                                  ? "var(--neutral-text-subtle-least)"
                                  : "",
                              }}
                            />
                            <span
                              className={`ml-2 ${each.className || ""}`}
                              style={
                                disableDisconnect
                                  ? {
                                      color: "var(--neutral-text-subtle-least)",
                                    }
                                  : {}
                              }
                            >
                              {each.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : null}
              {showCancel === true ? (
                <div className={sliderCloseButtonClass} onClick={onClose}>
                  {isMapper ? (
                    <FontAwesomeIcon className="mt-4" icon={faTimes} />
                  ) : screen === "Rkaas" ? (
                    <div className="mr-4 d-flex">
                      <Button className="ml-2 me-2" size="sx">
                        Close
                      </Button>
                    </div>
                  ) : screen === "NotesManager" ? (
                    <div className="notemanager-sdr-btn core-body-text-large-semi-bold-bd d-flex flex-row align-items-center me-2">
                      <FontAwesomeIcon
                        className="mr-2"
                        icon={faTimes}
                      ></FontAwesomeIcon>
                      <span className="td-underline">Close</span>
                    </div>
                  ) : (
                    <Button className="me-2" variant="secondary">
                      Close
                    </Button>
                  )}
                  {/* <FontAwesomeIcon icon={faTimes} /> */}
                </div>
              ) : null}
              {showCancelButton === true ? (
                <div
                  className="slider-cancel-button mr-2 core-mt-8"
                  onClick={onClose}
                  style={
                    isPlanConversion
                      ? { position: "fixed", zIndex: "2", right: "10px" }
                      : {}
                  }
                >
                  <Button className="me-2" variant="secondary">
                    Cancel
                  </Button>
                </div>
              ) : null}
              {customButton === true ? (
                <div className="slider-save-button mr-1r mt-8px">
                  <Button
                    className={customClassName}
                    variant={customVariant}
                    disabled={customDisabled || customButtonDisabled}
                    onClick={onCustomClick}
                  >
                    {customButtonLabel}
                  </Button>
                </div>
              ) : null}
              {showEdit === true ? (
                <div className="slider-edit-button mt-8px" onClick={onEdit}>
                  <Button className="" variant="primary">
                    Edit
                  </Button>
                  {/* <FontAwesomeIcon icon={faPencilAlt} /> */}
                </div>
              ) : null}
              {customButtonOnRight === true ? (
                <div
                  className="slider-save-button"
                  onClick={onCustomClick}
                  style={customDisabled ? { cursor: "not-allowed" } : {}}
                >
                  <Button variant="primary" disabled={customDisabled}>
                    {customButtonLabel}
                  </Button>
                </div>
              ) : null}
              {showRetrigger === true ? (
                <div className="slider-save-button">
                  <Button variant="primary" onClick={onRetrigger}>
                    Retrigger
                  </Button>
                </div>
              ) : null}

              {showSave === true ? (
                <div
                  className="slider-save-button core-mt-8"
                  style={
                    isPlanConversion
                      ? { position: "fixed", zIndex: "2", right: "20px" }
                      : isCT
                      ? {
                          opacity: "0.6",
                          cursor: "pointer",
                          pointerEvents: "none",
                        }
                      : screen === "communicationTo"
                      ? { marginTop: "8px" }
                      : {}
                  }
                >
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSaveDisabled}
                    onClick={onSave}
                  >
                    {isMapper ? "Select" : isPlanConversion ? "Next" : "Save"}
                  </Button>
                </div>
              ) : null}
              {showAdd === true ? (
                <div
                  className="slider-save-button mr-2 core-mt-8"
                  onClick={onAddClick}
                >
                  <Button variant="primary">{"Add"}</Button>
                </div>
              ) : null}
              {pageSubmit === "Usermanagement" ? (
                <div className="slider-save-button">
                  <Button className="" variant="primary" onClick={onAddClick}>
                    {"Save"}
                  </Button>
                </div>
              ) : null}
              {pageSubmit === "UsermanagementSave" ? (
                <div className="slider-save-button">
                  <Button className="" variant="primary" onClick={onSave}>
                    {"Save"}
                  </Button>
                </div>
              ) : null}
              {screen === "Usermanagement" ? (
                <div
                  className=" d-flex align-items-center m-1 buttonDiv"
                  onClick={() => onClose()}
                >
                  <div className="text-left fw-600 d-flex">
                    <div className="d-flex align-items-end">
                      <div className="um-close-button mr-5px">Close</div>
                      <i
                        className={`${styles["sliderpanel-v2"]} fa fa-times fw-200 k-cursor-pointer primary-text-color`}
                      ></i>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          {screen == "NotesManager" && (
            <div className={`w-fit-content core-body-text-regular-bold`}>
              <PayrollFileName fileName={fileName} />
            </div>
          )}
        </div>
      )}
      {showSeparator && <div className="bb-1px-solid-light"></div>}
      {showSeparatorSlider && (
        <div className="bb-1px-solid-light ml-1r mr-1r"></div>
      )}
      {separatorDisplay && <div className="um-border-line-slider"></div>}
      {lineSeparator && <div className="um-border-line"></div>}
      <div className={`${sliderClass} ${sliderChildrenClass}`.trim()}>
        {children}
      </div>
    </SlidingPane>
  );
};

export default SliderPanel;
