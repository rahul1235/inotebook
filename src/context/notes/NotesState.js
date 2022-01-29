import { useState } from "react";
import NoteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:4000/";
  const token = localStorage.getItem('token')
  const initialNotes = [];

  const getNotes = async () => {
    const addNoteApiUrl = `${host}api/notes`;
    const response = await fetch(addNoteApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });
    const jsonData = await response.json();
    setNotes(jsonData.data);
  };

  //   add a note
  const addNote = async (title, description, tag) => {
    const addNoteApiUrl = `${host}api/notes`;
    const response = await fetch(addNoteApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const jsonResponse = await response.json();
    const note = jsonResponse.data;
    setNotes(notes.concat(note));
  };

  //   edit a note
  const editNote = async (id, options) => {
    const { title, description, tag } = options;
    const updateNoteApiUrl = `${host}api/notes/${id}`;
    const body = JSON.stringify({ title, description, tag });
    const response = await fetch(updateNoteApiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body,
    });
    const jsonResponse = await response.json();
    const updatedNotes = [...notes];
    const editNoteIndex = updatedNotes.findIndex((note) => note._id === id);
    updatedNotes[editNoteIndex] = jsonResponse;
    setNotes(updatedNotes);
  };

  //   delete a note
  const deleteNote = async (id) => {
    const deleteNoteApiUrl = `${host}api/notes/${id}`;
    const response = await fetch(deleteNoteApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "applciation/json",
        token,
      },
    });
    await response.json();
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  const [notes, setNotes] = useState(initialNotes);
  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
