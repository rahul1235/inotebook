import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/notesContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

function Notes(props) {
  const { notes, getNotes, editNote } = useContext(noteContext);
  const navigate = useNavigate();

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    eTitle: "",
    eDescription: "",
    eTag: "",
  });
  const handleClick = () => {
    editNote(note.id, {
      title: note.eTitle,
      description: note.eDescription,
      tag: note.eTag,
    });
    refClose.current.click();
    props.showAlert("updated successfully", "success");
    // addNote(note.title, note.description, (note.tag = "default"));
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      eTitle: currentNote.title,
      eDescription: currentNote.description,
      eTag: currentNote.tag,
    });
    ref.current.click();
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        hidden
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="eTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTitle"
                    name="eTitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.eTitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eDescription"
                    name="eDescription"
                    onChange={onChange}
                    value={note.eDescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eTag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eTag"
                    name="eTag"
                    onChange={onChange}
                    value={note.eTag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
                disabled={
                  note.eTitle.length < 5 || note.eDescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddNote showAlert={props.showAlert}></AddNote>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
            ></NoteItem>
          );
        })}
      </div>
    </>
  );
}

export default Notes;
