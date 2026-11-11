import React from "react";

const NotesDeleteModal = ({ onDeleteYesClick, onDeleteNoClick }) => {
  return (
    <div className="core-body-text-regular-semi-bold delete-block mb-3">
      Are you sure? Do you want to delete? &nbsp;
      <button
        className="core-body-text-regular-semi-bold note-delete-button me-2"
        onClick={onDeleteYesClick}
      >
        Yes
      </button>
      <button
        className="core-body-text-regular-semi-bold note-delete-button"
        onClick={onDeleteNoClick}
      >
        No
      </button>
    </div>
  );
};

export default NotesDeleteModal;
