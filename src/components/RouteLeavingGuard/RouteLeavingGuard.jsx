import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ModalNotification from "../ModalNotification/ModalNotification";
import { appLayoutStore } from "../../contexts";

const RouteLeavingGuard = ({
  when,
  onRefresh,
  blockNavigation,
  keyValue,
  setKeyValue,
  page,
  dirtyKeyValue,
  persistNavState = false,
  routeLeaveBypassRef,
}) => {
  const navREF = useRef(when);
  // Always-current ref for `when` — avoids stale closures in the patched handlers
  const whenRef = useRef(when);
  const [modalVisible, setModalVisible] = useState(false);
  const [nextLocation, setNextLocation] = useState(null);
  const shouldNavigateRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Always-current ref for `location` — avoids stale closures in the patched handlers
  const locationRef = useRef(location);
  const { state } = useContext(appLayoutStore);

  // Keep refs in sync with latest prop/hook values on every render
  useEffect(() => {
    whenRef.current = when;
    if (persistNavState) {
      navREF.current = when;
    }
  }, [when, persistNavState]);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  // Patch window.history ONCE on mount and restore on unmount.
  // Using refs (whenRef / locationRef) inside the handlers guarantees they
  // always see the current `when` and `location` values without needing to
  // re-patch — which would break nested RouteLeavingGuard chains.
  useEffect(() => {
    const originalPush = window.history.pushState;
    const originalReplace = window.history.replaceState;

    window.history.pushState = function (...args) {
      const url = new URL(args[2], window.location.origin);
      const shouldBlock =
        (persistNavState ? navREF.current : whenRef.current) &&
        !routeLeaveBypassRef?.current;
      if (
        shouldBlock &&
        !shouldNavigateRef.current &&
        url.pathname !== locationRef.current.pathname
      ) {
        setModalVisible(true);
        setNextLocation(url.pathname + url.search);
        return;
      }
      originalPush.apply(window.history, args);
    };

    window.history.replaceState = function (...args) {
      const url = new URL(args[2], window.location.origin);
      const shouldBlock = whenRef.current && !routeLeaveBypassRef?.current;
      if (
        shouldBlock &&
        !shouldNavigateRef.current &&
        url.pathname !== locationRef.current.pathname
      ) {
        setModalVisible(true);
        setNextLocation(url.pathname + url.search);
        return;
      }
      originalReplace.apply(window.history, args);
    };

    return () => {
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    setNextLocation(null);
  };

  const handleConfirmNavigationClick = () => {
    setModalVisible(false);
    shouldNavigateRef.current = true;

    if (onRefresh) onRefresh();
    if (page === "Finch") setKeyValue(dirtyKeyValue);

    if (nextLocation) {
      navigate(nextLocation);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (whenRef.current) {
        e.preventDefault();
        e.returnValue = "Your changes may be lost. Do you want to continue?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalNotification
        show={modalVisible}
        header={state?.appUsage === "IRA" ? "" : "Are you sure?"}
        message={
          state?.appUsage === "IRA"
            ? "Your changes will not be saved. Do you wish to Cancel?"
            : "Your changes may be lost. Do you want to continue?"
        }
        onHide={closeModal}
        infoType={2}
        primaryButtonAction={handleConfirmNavigationClick}
        primaryButtonLabel={state?.appUsage === "IRA" ? "Yes,Cancel" : "Yes"}
        secondaryButtonAction={closeModal}
        secondaryButtonLabel={"No"}
      />
    </>
  );
};

export default RouteLeavingGuard;
