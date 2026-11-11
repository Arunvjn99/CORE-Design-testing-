import React from "react";
import ModalNotification from "../ModalNotification/ModalNotification";

const VestingOverrideToggle = ({
  showModal,
  handleConfirmClick,
  handleCancelClick,
  sourceName,
}) => {
  return (
    <ModalNotification
      show={showModal}
      header={"Are you sure?"}
      message={`You are overriding the Participant's vesting data for source ${sourceName}. Once overridden, vesting data for this source will not be auto updated by the system. Any further updates should be handled manually.`}
      onHide={handleCancelClick}
      infoType={2}
      primaryButtonAction={handleConfirmClick}
      primaryButtonLabel={"Yes"}
      secondaryButtonAction={handleCancelClick}
      secondaryButtonLabel={"No"}
    />
  );
};
export default VestingOverrideToggle;
