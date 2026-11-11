import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import fillednotesicon from "../../assets/svg/filled-note-icon.svg";
import bluenotesicon from "../../assets/svg/blue-note-icon.svg";
import NoteManagerComponent from "../NotesManagerComponent/NoteManagerComponent";
import AddToolTip from "../AddToolTip";

const NoteManagerWrapper = ({
  entityType,
  data,
  entityId,
  fileName,
  label,
  className,
  excludeLeftMargin,
  uploadedBy,
  uploadedOn,
  isReuploaded = false,
  style = {},
  onOpen,
  onNotesChanged,
}) => {
  const [openNotes, setOpenNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentFile, setCurrentFile] = useState("");
  const [uploadedByName, setUploadedBy] = useState("");
  const [uploadedOnDate, setUploadedOn] = useState("");
  useEffect(() => {
    if (data) {
      setNotes(data);
      setCurrentFile(fileName);
      setUploadedBy(uploadedBy ?? data.uploadedBy ?? "");
      setUploadedOn(uploadedOn ?? data.uploadedOn ?? data.uploadedDate ?? "");
    }
  }, [data, fileName, uploadedBy, uploadedOn]);
  return (
    <>
      {![undefined, NaN, 0, null].includes(entityId) && (
        <>
          <div
            className={className}
            onClick={(e) => {
              e.stopPropagation();
              setOpenNotes(true);
              onOpen?.();
            }}
          >
            {entityType === "TradeReconciliation" ? (
              <Image
                src={notes?.length > 0 ? fillednotesicon : bluenotesicon}
                className="ml-2 hw-17 noteicon cursor-pointer"
              />
            ) : (
              <AddToolTip
                className="d-flex justify-content-center align-items-center"
                name={"Click to add/view notes"}
                style={style}
              >
                <Image
                  src={notes?.length > 0 ? fillednotesicon : bluenotesicon}
                  className={`${
                    excludeLeftMargin ? `` : `ml-2`
                  } hw-17 noteicon cursor-pointer`}
                />
              </AddToolTip>
            )}
          </div>
          <NoteManagerComponent
            notes={notes}
            openNotes={openNotes}
            setOpenNotes={setOpenNotes}
            setNotes={setNotes}
            onNotesChanged={onNotesChanged ?? onOpen}
            entityId={entityId}
            entityType={entityType}
            fileName={currentFile}
            label={label}
            uploadedBy={uploadedByName}
            uploadedOn={uploadedOnDate}
            isReuploaded={isReuploaded}
          />
        </>
      )}
    </>
  );
};

export default NoteManagerWrapper;
