import React from "react";
import ModalNotification from "../ModalNotification/ModalNotification";

const FormLeaveGuard = ({
  showModal,
  handleConfirmClick,
  handleCancelClick,
}) => {
  return (
    <ModalNotification
      show={showModal}
      header={"Are you sure?"}
      message={"Your changes may be lost. Do you want to continue?"}
      onHide={handleCancelClick}
      infoType={2}
      primaryButtonAction={handleConfirmClick}
      primaryButtonLabel={"Yes"}
      secondaryButtonAction={handleCancelClick}
      secondaryButtonLabel={"No"}
    />
  );
};
export default FormLeaveGuard;
