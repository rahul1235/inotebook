import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notesContext";

function AddNote(props) {
  const { addNote } = useContext(noteContext);
  const initialNoteState = {
    title: "",
    description: "",
    tag: "",
  };
  const [note, setNote] = useState(initialNoteState);
  const handleClick = () => {
    addNote(note.title, note.description, (note.tag = "default"));
    setNote(initialNoteState);
    props.showAlert("added successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2 style={{ marginTop: "60px" }}>Add a note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="button"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

export default AddNote;
