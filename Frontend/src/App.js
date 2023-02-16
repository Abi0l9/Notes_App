import "./App.css";
import Container from "./components/Container/Container";
import NoteForm from "./components/NoteForm/NoteForm";
import NoteList from "./components/NoteList/NoteList";
import { useState } from "react";

function App() {
  let [notes, setNotes] = useState([
    { id: 1, title: "first note", content: "first content" },
    { id: 2, title: "second note", content: "second content" },
  ]);
  const [noteToUpdate, setNoteToUpdate] = useState("");

  const handleNoteSubmit = (obj) => {
    obj.id = notes.length + 1;
    setNotes((notes = notes.concat(obj)));
  };

  const handleNoteDelete = (id) => {
    notes.splice(id, 1);
    setNotes([...notes]);
  };

  const handleNoteUpdate = (noteIdx) => {
    const note = notes.filter((note, id) => id === noteIdx);
    if (note) {
      const noteId = note[0].id;
      const selectedNoteIdx = notes.findIndex(
        (selected) => selected.id === noteId
      );
      setNoteToUpdate(note);
      notes.splice(selectedNoteIdx, 1);
      setNotes([...notes]);
      console.log(notes);
    }
  };

  return (
    <div className="">
      <Container>
        <NoteForm submit={handleNoteSubmit} noteToUpdate={noteToUpdate} />
        <NoteList
          notes={notes}
          deleteNote={handleNoteDelete}
          update={handleNoteUpdate}
        />
      </Container>
    </div>
  );
}

export default App;
