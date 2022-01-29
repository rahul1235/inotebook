import React, { useContext } from "react";
import notesContext from "../context/notes/notesContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const { deleteNote } = useContext(notesContext);

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-1"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("deleted successfully", "success");
              }}
            ></i>
            <i
              className="far fa-edit mx-1"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
