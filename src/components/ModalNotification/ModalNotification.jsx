import React, { useState } from "react";
import {
  faExclamationTriangle,
  faInfoCircle,
  faShieldCheck,
  faTimes,
  faTimesCircle,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import { getTestId } from "@/SDUI/utils/testIds";

const ModalNotification = ({
  show,
  onHide,
  header,
  message,
  primaryButtonLabel,
  primaryButtonAction,
  secondaryButtonLabel,
  secondaryButtonAction,
  onlyOneButton = false,
  infoType,
  IsCentered = false,
  showNotes = false,
  notesValue = "",
  onNotesChange,
  backdrop = true,
  showPreviousNextButton = false,
  warrings = [],
  testId,
}) => {
  const [notes, setNotes] = useState("");
  const [currentWarningIndex, setCurrentWarningIndex] = useState(0);
  const iconStyle = [
    {
      type: 1,
      icon: faShieldCheck,
      className: "bc-success success-text-color",
    },
    {
      type: 2,
      icon: faExclamationTriangle,
      className: "bc-warning warning-text-color",
    },
    {
      type: 3,
      icon: faTimesCircle,
      className: "bc-critical critical-text-color",
    },
    {
      type: 4,
      icon: faInfoCircle,
      className: "infoBorder highlight-text-color",
    },
  ];

  const selectedType = iconStyle.find((type) => type.type === infoType);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    if (onNotesChange) onNotesChange(e.target.value);
  };

  const totalWarnings = warrings.length || 0;

  const handlePrevious = () => {
    if (currentWarningIndex > 0) {
      setCurrentWarningIndex(currentWarningIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentWarningIndex < totalWarnings - 1) {
      setCurrentWarningIndex(currentWarningIndex + 1);
    }
  };

  const currentWarning = warrings[currentWarningIndex];

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered={IsCentered}
      className="modalStyle"
      backdrop={backdrop}
    >
      <Modal.Body className="modalbody">
        <div className="leftSide">
          <FontAwesomeIcon
            icon={selectedType.icon}
            className={`iconStyle ${selectedType.className}`}
          />
        </div>
        <div className="rightSide">
          {header && <div className="header">{header}</div>}

          {showPreviousNextButton && totalWarnings > 0 && (
            <>
              <div className="subHeader">
                <span className="counter">
                  {currentWarningIndex + 1}/{totalWarnings}
                </span>
                <span className="warningName">
                  {currentWarning.warningName}
                </span>
              </div>
              <div className="subMessage">
                {currentWarning.warningDescription}
              </div>
            </>
          )}
          {message && <div className="subMessage">{message}</div>}

          {showNotes && (
            <div className="notes-section">
              <label className="notes-label mt-2">
                Waive off Reason (optional)
              </label>
              <textarea
                className="notes-textarea"
                placeholder="Type here"
                value={notesValue || ""}
                onChange={handleNotesChange}
                maxLength={150}
              />
            </div>
          )}
          <div className="buttons">
            {showPreviousNextButton && totalWarnings > 0 && (
              <div>
                <Button
                  className="navigationButton"
                  onClick={handlePrevious}
                  disabled={currentWarningIndex <= 0}
                  aria-disabled={currentWarningIndex <= 0}
                  data-testid={getTestId(
                    `${testId?.split("-")[0]}-button-previous`
                  )}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span className="btnText">Previous</span>
                </Button>

                <Button
                  className="navigationButton"
                  onClick={handleNext}
                  disabled={currentWarningIndex >= totalWarnings - 1}
                  aria-disabled={currentWarningIndex >= totalWarnings - 1}
                  data-testid={getTestId(
                    `${testId?.split("-")[0]}-button-next`
                  )}
                >
                  <span className="btnText">Next</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Button>
              </div>
            )}
            {showPreviousNextButton ? (
              currentWarningIndex === totalWarnings - 1 && (
                <Button
                  className="primaryButton"
                  onClick={primaryButtonAction}
                  data-testid={getTestId(
                    `${testId?.split("-")[0]}-button-confirm`
                  )}
                >
                  {primaryButtonLabel}
                </Button>
              )
            ) : (
              <Button
                className="primaryButton"
                onClick={primaryButtonAction}
                data-testid={getTestId(
                  `${testId?.split("-")[0]}-button-confirm`
                )}
              >
                {primaryButtonLabel}
              </Button>
            )}

            {!onlyOneButton && (
              <Button
                className="secondaryButton"
                onClick={secondaryButtonAction}
                data-testid={getTestId(
                  `${testId?.split("-")[0]}-button-cancel`
                )}
              >
                {secondaryButtonLabel}
              </Button>
            )}
          </div>
        </div>
        {onHide && (
          <div className="closeButton">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={onHide}
              className="buttonStyle"
              data-testid={getTestId(`${testId?.split("-")[0]}-button-close`)}
            />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalNotification;
