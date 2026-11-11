import React, { useState } from "react";
import { useDeepEffect } from "@/abstracts/hooks";
import ModalNotification from "../ModalNotification/ModalNotification";

const TabLeavingGuard = ({
  isInnerFormDirty,
  setIsInnerFormDirty,
  setkeyValue,
  nextkeyValue,
  keyValue,
  setNextkeyValue,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleConfirmNavigationClick = () => {
    setkeyValue(nextkeyValue);
    setModalVisible(false);
    setIsInnerFormDirty(false);
  };

  const handleCancelClick = () => {
    setNextkeyValue(keyValue);
    closeModal();
  };

  const menuChange = () => {
    if (isInnerFormDirty) {
      setModalVisible(true);
    } else {
      setkeyValue(nextkeyValue);
    }
  };

  useDeepEffect(
    () => {
      if (keyValue !== nextkeyValue) {
        menuChange();
      }
    },
    [keyValue, nextkeyValue],
    true
  );

  return (
    <ModalNotification
      show={modalVisible}
      header={"Are you sure?"}
      message={"Your changes may be lost. Do you want to continue?"}
      onHide={handleCancelClick}
      infoType={2}
      primaryButtonAction={handleConfirmNavigationClick}
      primaryButtonLabel={"Yes"}
      secondaryButtonAction={handleCancelClick}
      secondaryButtonLabel={"No"}
    />
  );
};
export default TabLeavingGuard;
