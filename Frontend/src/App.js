import "./App.css";
import Container from "./components/Container/Container";
import NoteForm from "./components/NoteForm/NoteForm";
import NoteList from "./components/NoteList/NoteList";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([
    { title: "first note", content: "first content" },
    { title: "second note", content: "second content" },
  ]);

  const handleNoteSubmit = (obj) => {
    setNotes(notes.concat(obj));
  };

  const handleNoteDelete = (id) => {
    notes.splice(id, 1)
    setNotes([...notes]);
  };

  return (
    <div className="">
      <Container>
        <NoteForm submit={handleNoteSubmit} />
        <NoteList notes={notes} deleteNote={handleNoteDelete}/>
      </Container>
    </div>
  );
}

export default App;
