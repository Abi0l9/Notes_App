import "./App.css";
import Container from "./components/Container/Container";
import { useState } from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";

function App() {
  let [notes, setNotes] = useState([
    { id: 1, title: "first note", content: "first content" },
    { id: 2, title: "second note", content: "second content" },
  ]);
  let [noteToUpdate, setNoteToUpdate] = useState("");

  const handleNoteSubmit = (obj) => {
    obj.id = notes.length + 1;
    setNotes((notes = notes.concat(obj)));
    noteToUpdate = "";
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
    }
  };

  const handleUserReg = (obj) => {
    console.log(obj);
  };

  const handleUserLogin = (obj) => {
    console.log(obj);
  };

  return (
    <div className="">
      <BrowserRouter>
        <Link className="App-link" to="/login">
          Login
        </Link>
        <Link className="App-link" to="/register">
          Register
        </Link>
        <Link className="App-link" to="/user-page">
          Notes
        </Link>
        <Routes>
          <Route path="/login" element={<Login login={handleUserLogin} />} />
          <Route
            path="/register"
            element={<Registration register={handleUserReg} />}
          />
          <Route
            path="/user-page"
            element={
              <Container
                submit={handleNoteSubmit}
                noteToUpdate={noteToUpdate}
                notes={notes}
                deleteNote={handleNoteDelete}
                update={handleNoteUpdate}
              />
            }
          />
        </Routes>
        {/* <Container
          submit={handleNoteSubmit}
          noteToUpdate={noteToUpdate}
          notes={notes}
          deleteNote={handleNoteDelete}
          update={handleNoteUpdate}
        /> */}
        {/* <NoteForm submit={handleNoteSubmit} noteToUpdate={noteToUpdate} /> */}
        {/* <NoteList
          notes={notes}
          deleteNote={handleNoteDelete}
          update={handleNoteUpdate}
        /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
