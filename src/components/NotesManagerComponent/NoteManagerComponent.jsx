import styles from "./NoteManagerComponent.module.scss";
import React, { useEffect, useRef } from "react";
import SliderPanel from "../SliderPanel/SliderPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPaperPlane,
  faTrash,
  faPen,
  faMinusCircle,
  faChevronRight,
} from "@fortawesome/pro-light-svg-icons";
import { useState } from "react";
import { isEmpty, toUpper } from "lodash-es";
import { useContext } from "react";
import { appLayoutStore } from "../../contexts";
import ModalNotification from "../ModalNotification";
import { addNotesAdjustment } from "@/services/adjustments";
import { addNotesInvoice } from "@/services/Fee";
import { addNotesInPlanRothConversion } from "@/services/inPlanRothConversion";
import { addNotesPayroll } from "@/services/payroll";
import { addNotesRollOverIn } from "@/services/rollOverIn";
import { addNotesTrade, addCashReconNotes } from "@/services/trade";
import { addNotesLoan, addNotesTransfer } from "@/services/transaction";
import { addNotesDistribution } from "@/services/withdrawal";
import { usDateFormat } from "@/utils/helpers";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import NotesDeleteModal from "../NotesDeleteModal/NotesDeleteModal";
import AddToolTip from "../AddToolTip/AddToolTip";
import { useLocation } from "react-router";
import { addNotesDocument } from "../../services/Documents";
import BannerNotification from "../BannerNotification";
import {
  createCompanyNote,
  updateCompanyNote,
  deleteCompanyNote,
} from "@/services/company";
import {
  createNotesPlan,
  updateNotesPlan,
  deleteNotesPlan,
} from "@/services/plan";
import { invalidateNotesCache } from "@/utils/notesCache";

import { ENTITY_TYPES } from "@/utils/constants/common";
const formatDateTime = (date) => {
  const newDate = new Date(date);
  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  if (!isEmpty(date)) {
    const [month, day, year, time, period] = newDate
      .toLocaleString("en-US", options)
      .replace(",", "")
      .split(" ");
    return `${month} ${day}, ${year.replace(",", "")} ${time}${period}`;
  }
  // return date
  // .toLocaleString("en-US", options)
  // .replace(",", "")
  // .replace("AM", "AM")
  // .replace("PM", "PM");
};
const ReadMoreComponent = ({ note, moduleName }) => {
  const [isExpanded, setIsExpandeded] = useState(false);
  const toggleExpand = () => {
    setIsExpandeded((prev) => !prev);
  };
  return isExpanded ? (
    <div className="notes-text-wrap">
      {moduleName && (
        <div className="core-body-text-small-semi-bold-sl mb-2">
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`${styles["m-r-6px"]}`}
          />
          {moduleName}
        </div>
      )}
      {note?.comment} &nbsp;
      <span
        className="core-body-text-regular-medium link-text text-decoration-underline"
        onClick={toggleExpand}
      >
        Read less
      </span>
      {note?.modifiedOn && (
        <div className="core-body-text-small-medium-sl mb-2 mt-2">
          <FontAwesomeIcon icon={faPen} /> Edited On{" "}
          {new Date(note?.modifiedOn).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      )}
    </div>
  ) : (
    <div>
      {note?.comment?.length > 500 ? (
        <div className="notes-text-wrap">
          {moduleName && (
            <div className="core-body-text-small-semi-bold-sl mb-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`${styles["m-r-6px"]}`}
              />
              {moduleName}
            </div>
          )}
          {note?.comment.substring(0, 500)}...{" "}
          <span
            className="core-body-text-regular-medium link-text text-decoration-underline"
            onClick={toggleExpand}
          >
            Read more
          </span>
          {note?.modifiedOn && (
            <div className="core-body-text-small-medium-sl mb-2 mt-2">
              <FontAwesomeIcon icon={faPen} /> Edited On{" "}
              {new Date(note?.modifiedOn).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="notes-text-wrap">
          {moduleName && (
            <div className="core-body-text-small-semi-bold-sl mb-2">
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`${styles["m-r-6px"]}`}
              />
              {moduleName}
            </div>
          )}
          {note?.comment}
          {note?.modifiedOn && (
            <div className="core-body-text-small-medium-sl mb-2 mt-2">
              <FontAwesomeIcon icon={faPen} /> Edited On{" "}
              {new Date(note?.modifiedOn).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const useAutosizeTextArea = (textAreaRef, value) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};
const getApiName = (entityType) => {
  switch (entityType) {
    case "FileUploadInformation":
      return addNotesPayroll;
    case "EmployeeInformation":
      return addNotesPayroll;
    case "Adjustment":
    case "Reversal":
    case "DividendReversal":
      return addNotesAdjustment;
    case "FeeReversal":
      return addNotesAdjustment;
    case "TradeReconciliation":
      return addNotesTrade;
    case "Loan":
      return addNotesLoan;
    case "TransferDetails":
      return addNotesTransfer;
    case "RebalanceDetails":
      return addNotesTransfer;
    case "RollOverIn":
      return addNotesRollOverIn;
    case "WithdrawalRequest":
      return addNotesDistribution;
    case "ModelPortfolioRebalance":
      return addNotesTransfer;
    case "CashReconciliation":
      return addCashReconNotes;
    case "DocumentHub":
      return addNotesDocument;
    case "InPlanRothConversionRequest":
      return addNotesInPlanRothConversion;
    case "Invoice":
      return addNotesInvoice;
    default:
      return null;
  }
};
const getPageName = ({ pathname, label }) => {
  const path = pathname?.split("/");
  if (path?.includes("payroll") && path.length > 2) {
    return label;
  } else if (path?.includes("payroll") && path?.length === 2) {
    return "Manage Payroll";
  } else {
    return "Create or Generate Payroll";
  }
};

const getNoteModuleName = ({ label, pathname, fallbackModuleName }) => {
  const directLabel = typeof label === "string" ? label.trim() : "";
  const pathSegments = pathname
    ?.split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);
  const pathLabel = pathSegments?.length
    ? pathSegments[pathSegments.length - 1]
    : "";

  const moduleName = directLabel || pathLabel || fallbackModuleName || "";
  return moduleName === "company" || moduleName === "plan" ? "" : moduleName;
};

const NoteManagerComponent = ({
  notes,
  entityId,
  openNotes,
  setOpenNotes,
  setNotes,
  onNotesChanged,
  entityType,
  fileName,
  label = "",
  uploadedBy,
  uploadedOn,
  isReuploaded = false,
}) => {
  const { state: state1 } = useContext(appLayoutStore);
  const reuploadedBy = uploadedBy ? uploadedBy : "Unknown";
  const formattedDate = uploadedOn ? formatDateTime(uploadedOn) : null;
  const reUploadedOn = formattedDate || "Unknown";
  const userRole = state1?.userRole;
  const userEmailId = state1?.user;
  const [message, setMessage] = useState({
    comment: "",
    createdOn: "",
    createdByName: userEmailId,
  });
  const [editDeleteId, setEditDeleteId] = useState(null);
  const messagesEndRef = useRef(null);
  const [isExpanded, setIsExpandeded] = useState(false);
  const [originalMessage, setOriginalMessage] = useState({
    comment: "",
    createdOn: "",
  });
  const [addMessage, setAddMessage] = useState({
    comment: "",
    createdOn: "",
    createdByName: userEmailId,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const textAreaRef = useRef(null);
  const editTextAreaRef = useRef(null);
  const location = useLocation();
  const notesLength = notes?.filter((note) => !note?.isDeleted)?.length;
  const [bannerInfo, setBannerInfo] = useState(null);
  useEffect(() => {
    if (entityType === "FileUploadInformation" && isReuploaded && !bannerInfo) {
      setBannerInfo({
        by: uploadedBy || "Unknown",
        on: uploadedOn,
      });
    }
  }, [entityType, isReuploaded]);
  const PayrollFileName = () => {
    return (
      <>
        {fileName.length > 25 ? (
          <OverlayTrigger
            placement="top-start"
            overlay={<Tooltip>{fileName}</Tooltip>}
          >
            <p className="para-wrap d-flex payroll-fn ml-0">
              <p className="core-body-text-regular-bold">
                {(fileName || "").slice(0, 8)}...
                {(fileName || "").slice(
                  fileName.length - 16,
                  fileName.lastIndexOf(".")
                )}
              </p>
              <p
                className={`subtle-least-text-color core-body-text-regular-bold-sl`}
              >
                {(fileName || "").slice(
                  fileName.lastIndexOf("."),
                  fileName.length
                )}{" "}
              </p>
            </p>
          </OverlayTrigger>
        ) : (
          <p className="para-wrap d-flex payroll-fl">
            <p className="core-body-text-regular-bold">
              {fileName.slice(0, fileName.lastIndexOf("."))}
            </p>
            {/* <p
            className="core-body-text-regular-bold-sl"
            style={{
              color:
                data.uploadedThrough == "Finch" ||
                data.uploadedThrough == "CreatePayroll"
                  ? "var(--neutral-text-default)"
                  : "var(--neutral-text-subtle-least)",
            }}
          > */}
            {fileName.includes(".") && (
              <p className="default-text-color">
                {fileName.slice(fileName.lastIndexOf("."), fileName.length)}{" "}
              </p>
            )}
          </p>
        )}
      </>
    );
  };

  const handleSendClick = () => {
    if (addMessage?.comment) {
      if (
        entityType === ENTITY_TYPES.Company ||
        entityType === ENTITY_TYPES.Plan
      ) {
        const payload = {
          id: 0,
          entityId: entityId,
          entityType: entityType,
          comment: addMessage?.comment,
          moduleName: getNoteModuleName({
            label,
            pathname: location?.pathname,
            fallbackModuleName: entityType,
          }),
        };
        addNoteApiCall({ payload: payload, deleted: false });
        setAddMessage({
          comment: "",
          createdOn: "",
        });
      } else if (entityType === "FileUploadInformation") {
        const payload = {
          id: 0,
          entityId: entityId,
          entityType: entityType,
          comment: addMessage?.comment,
          createdByName: "",
          createdOn: usDateFormat(now),
          isDeleted: false,
          location: getPageName({ pathname: location.pathname, label: label }),
        };
        addNoteApiCall({ payload: payload, deleted: false });
        setAddMessage({
          comment: "",
          createdOn: "",
        });
      } else {
        const payload = {
          id: 0,
          entityId: entityId,
          entityType: entityType,
          comment: addMessage?.comment,
          createdByName: userEmailId,
          createdOn: usDateFormat(now),
          isDeleted: false,
        };
        addNoteApiCall({ payload: payload, deleted: false });
        setAddMessage({
          comment: "",
          createdOn: "",
        });
      }
    }
  };
  const handleSaveClick = () => {
    if (message?.comment) {
      if (editDeleteId !== null) {
        if (message?.comment === originalMessage?.comment) {
          setOriginalMessage({
            comment: "",
            createdOn: "",
          });
          setMessage({
            comment: "",
            createdOn: "",
          });
          setEditDeleteId(null);
          return;
        }
        addNoteApiCall({ payload: message, deleted: false });
        setEditDeleteId(null);
      }
      setMessage({
        comment: "",
        createdOn: "",
      });
    }
  };

  const addNoteApiCall = ({ payload, deleted }) => {
    let requestPayload = payload;
    let addNotesApi = getApiName(entityType);
    if (
      entityType === ENTITY_TYPES.Company ||
      entityType === ENTITY_TYPES.Plan
    ) {
      const resolvedModuleName = getNoteModuleName({
        label,
        pathname: location?.pathname,
        fallbackModuleName: entityType,
      });
      requestPayload = {
        id: payload?.id,
        entityId: entityId,
        entityType: entityType,
        comment: payload?.comment,
        createdByName: payload?.createdByName,
        createdOn: payload?.createdOn,
        moduleName: payload?.id
          ? payload?.moduleName ?? ""
          : resolvedModuleName || payload?.moduleName || "",
        isDeleted: deleted || payload?.isDeleted || false,
      };
      const isPlan = entityType === ENTITY_TYPES.Plan;
      addNotesApi = deleted
        ? isPlan
          ? deleteNotesPlan
          : deleteCompanyNote
        : requestPayload.id
        ? isPlan
          ? updateNotesPlan
          : updateCompanyNote
        : isPlan
        ? createNotesPlan
        : createCompanyNote;
    }
    if (addNotesApi == null) return;
    addNotesApi(
      deleted &&
        (entityType === ENTITY_TYPES.Company ||
          entityType === ENTITY_TYPES.Plan)
        ? requestPayload?.id
        : requestPayload
    )
      .then((res) => {
        if (
          entityType === ENTITY_TYPES.Company ||
          entityType === ENTITY_TYPES.Plan
        ) {
          invalidateNotesCache(`${entityType}:${entityId}`);
          if (deleted) {
            setNotes((currentNotes) =>
              currentNotes.map((note) =>
                note?.id === requestPayload.id
                  ? { ...note, isDeleted: true }
                  : note
              )
            );
            return;
          }
          if (onNotesChanged) {
            onNotesChanged();
            return;
          }
          if (!res) {
            throw new Error("Company note request returned no note.");
          }
          setNotes((currentNotes) =>
            requestPayload?.id
              ? currentNotes.map((note) =>
                  note?.id === requestPayload.id ? res : note
                )
              : [...currentNotes, res]
          );
          if (!requestPayload?.id) {
            messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
        if (res.isSuccessfull) {
          if (deleted) {
            const newNotes = notes.map((note) => {
              if (note?.id === payload?.id) return { ...note, isDeleted: true };
              return note;
            });
            setNotes(newNotes);
          } else {
            if (payload?.id) {
              var index = notes.findIndex((note) => note?.id === payload?.id);
              var editedNote = res.notes?.find(
                (note) => note?.id === payload?.id
              );
              setNotes(
                notes.map((note, i) => (i === index ? editedNote : note))
              );
            } else {
              setNotes([...notes, res.notes[res.notes?.length - 1]]);
              messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleConfirmNavigationClick = () => {
    setModalVisible(false);
    setOpenNotes(false);
    setEditDeleteId(null);
    setNotes(notes?.filter((note) => !note?.isDeleted));
    setMessage({
      comment: "",
      createdOn: "",
      createdByName: "",
    });
    setAddMessage({
      comment: "",
      createdOn: "",
      createdByName: "",
    });
  };
  const onSliderClose = () => {
    if (message?.comment === "" && addMessage?.comment === "") {
      setOpenNotes(false);
      setEditDeleteId(null);
      setNotes(notes.filter((note) => !note?.isDeleted));
    }
    setDeleteModalVisible(-1);
    if ((message?.comment !== "" || addMessage?.comment) && openNotes) {
      setModalVisible(true);
    }
  };

  const handleDelete = (id) => {
    let deletedNote = notes?.find((note) => note?.id === id);
    if (deletedNote != null) {
      if (
        entityType === ENTITY_TYPES.Company ||
        entityType === ENTITY_TYPES.Plan
      ) {
        deletedNote = { ...deletedNote, isDeleted: true };
      } else {
        deletedNote.isDeleted = true;
      }
      addNoteApiCall({ payload: deletedNote, deleted: true });
    }
    setEditDeleteId(null);
  };

  const handleEdit = (id) => {
    if (editDeleteId === notes[id]?.id) return;
    setOriginalMessage(notes[id]);
    setDeleteModalVisible(-1);
    setMessage(notes[id]);
    setEditDeleteId(notes[id]?.id);
  };

  const now = new Date();
  const formattedDateTime = formatDateTime(now);

  const toggleExpand = () => {
    setIsExpandeded((prev) => !prev);
  };

  const onDeleteYesClick = () => {
    handleDelete(editDeleteId);
    setDeleteModalVisible(-1);
    setMessage({
      comment: "",
      createdOn: "",
    });
  };

  const onDeleteNoClick = () => {
    setDeleteModalVisible(-1);
    setEditDeleteId(null);
  };
  useAutosizeTextArea(textAreaRef.current, addMessage?.comment);
  useAutosizeTextArea(editTextAreaRef.current, message?.comment);
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <SliderPanel
        header="Notes"
        isOpen={openNotes}
        showHeader={true}
        showSeparator={true}
        screen={"NotesManager"}
        onClose={onSliderClose}
        fileName={fileName}
        width="35%"
      >
        <div className="d-flex flex-col message-block justify-content-between h-100p">
          <div
            className={`d-flex padding-240px flex-row height-74 overflow-y-auto-x-hidden ${
              message?.comment ? "height-64" : "height-74"
            }`}
          >
            <div className="w-100">
              {bannerInfo && (
                <div className="d-flex create-dividend-body">
                  <div className="pb-3">
                    <BannerNotification
                      infoType={6}
                      message={`This file was re-uploaded by ${reuploadedBy} on ${reUploadedOn}`}
                    />
                  </div>
                </div>
              )}
              <div className=" mb-16">
                <div className="d-flex align-items-center">
                  <div className="core-body-text-small-medium-sl text-wrap-nowrap pr-1">
                    {notesLength < 10 && notesLength != 0
                      ? `0${notesLength} Note(s) found`
                      : `${notesLength ?? 0} Note(s) found`}
                  </div>
                  <div className="horizontal-line-notes"></div>
                </div>
              </div>
              {notes?.map((note, index) => {
                if (note?.isDeleted) {
                  return (
                    <div className="d-flex mb-16 deleted-note-notification body-text-regular-semi-bold">
                      <FontAwesomeIcon icon={faMinusCircle} />
                      Deleted
                    </div>
                  );
                }
                if (deleteModalVisible === index) {
                  return (
                    <NotesDeleteModal
                      onDeleteYesClick={onDeleteYesClick}
                      onDeleteNoClick={onDeleteNoClick}
                    />
                  );
                }
                return (
                  <div
                    className={`d-flex flex-col mb-16 note-display-transition${
                      deleteModalVisible === index && "-hide"
                    }`}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-8px">
                      <div className="d-flex flex-row align-items-center">
                        <div className="name-initials-nm mr-2">
                          {toUpper(note?.createdByName).slice(0, 2)}
                        </div>
                        {note?.createdByName?.length <= 15 ? (
                          <div className="core-body-text-small-medium mr-2">
                            {note?.createdByName}
                          </div>
                        ) : (
                          <AddToolTip
                            className="core-body-text-small-medium mr-2 mb-1"
                            name={note?.createdByName}
                          >
                            {note?.createdByName?.slice(0, 15)}...
                          </AddToolTip>
                        )}
                        <div className="dot-nm mr-2"></div>
                        <div className="core-body-text-small-medium-sl">
                          {formatDateTime(note?.createdOn)}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        {note?.createdByName === userEmailId?.UserId && (
                          <div
                            onClick={() => {
                              handleEdit(index);
                            }}
                            className="core-body-text-small-semi-bold-bd mr-2 cursor-pointer notes-edit"
                          >
                            <FontAwesomeIcon
                              className="cursor-pointer mr-1"
                              icon={faEdit}
                            />
                            Edit
                          </div>
                        )}
                        {(userRole == "Admin" ||
                          userRole == "SPU" ||
                          note?.createdByName === userEmailId?.UserId) && (
                          <FontAwesomeIcon
                            className="core-body-text-small-bold-ct cursor-pointer mr-2"
                            icon={faTrash}
                            onClick={() => {
                              setDeleteModalVisible(index);
                              setEditDeleteId(note?.id);
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {note &&
                    (!editDeleteId ||
                      editDeleteId != note?.id ||
                      deleteModalVisible != -1) ? (
                      <div className="core-body-text-regular-medium message-block-2 ">
                        <ReadMoreComponent
                          note={note}
                          moduleName={
                            entityType === ENTITY_TYPES.Company ||
                            entityType === ENTITY_TYPES.Plan
                              ? note?.moduleName
                              : note?.location
                          }
                        />
                      </div>
                    ) : (
                      <div className="core-body-text-regular-medium message-edit-block">
                        <textarea
                          name="message"
                          value={message?.comment}
                          placeholder="Type your notes here...."
                          ref={editTextAreaRef}
                          className="border-none fieldstyle notes-field"
                          onChange={(event) => {
                            let messageInfo = {
                              ...message,
                              comment: event.target.value,
                            };
                            setMessage(messageInfo);
                          }}
                        />
                        <div className="d-flex flex-row justify-content-end button-bg-edit">
                          <Button
                            variant="secondary"
                            className="core-body-text-regular-semi-bold mr-2 d-flex flex-row align-items-center"
                            onClick={() => {
                              setEditDeleteId(null);
                              setMessage({
                                comment: "",
                                createdOn: "",
                              });
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            className="core-body-text-regular-semi-bold d-flex flex-row align-items-center"
                            onClick={handleSaveClick}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef}></div>
            </div>
          </div>
          <div className="messageBox border-primar p-3 mt-2">
            <div className="textareaandbutton">
              <textarea
                name="message"
                value={
                  addMessage?.comment?.length > 0 ? addMessage?.comment : ""
                }
                ref={textAreaRef}
                placeholder="Type your notes here...."
                className="border-none fieldstyle notes-field"
                disabled={editDeleteId ? true : false}
                onChange={(event) => {
                  let messageInfo = {
                    ...addMessage,
                    comment: event.target.value,
                  };
                  setAddMessage(messageInfo);
                }}
              />
              {!editDeleteId && addMessage?.comment && (
                <div className="d-flex flex-row justify-content-end button-bg">
                  <button
                    className="border-bd core-body-text-regular-semi-bold d-flex flex-row align-items-center"
                    onClick={handleSendClick}
                  >
                    <FontAwesomeIcon
                      className="mr-2 paperplanerotate "
                      icon={faPaperPlane}
                    ></FontAwesomeIcon>
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SliderPanel>
      <ModalNotification
        show={modalVisible}
        // header={"Are you sure?"}
        message={
          "Are you sure you want to close the tab? The changes made will be discarded"
        }
        onHide={closeModal}
        infoType={2}
        primaryButtonAction={handleConfirmNavigationClick}
        primaryButtonLabel={"Yes"}
        secondaryButtonAction={closeModal}
        secondaryButtonLabel={"No"}
      />
    </div>
  );
};

export default NoteManagerComponent;
