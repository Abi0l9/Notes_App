import "./App.css";
import Container from "./components/Container/Container";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import services from "./services/requests";

function App() {
  let [notes, setNotes] = useState([]);
  let [noteToUpdate, setNoteToUpdate] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (user) {
      services.retrieveNotes().then((data) => setNotes(data));
    }
  }, [user]);

  useEffect(() => {
    console.log(notes);
  });

  useEffect(() => {
    const activeUser = window.sessionStorage.getItem("user");
    if (activeUser) {
      const user = JSON.parse(activeUser);
      setUser(user);
      services.setToken(user.token);
    }
  }, []);

  const handleNoteSubmit = async (obj) => {
    const newNote = await services.createNote(obj);
    setNotes((notes = notes.concat(newNote)));
    noteToUpdate = "";
  };

  const handleNoteDelete = (id, noteId) => {
    try {
      notes.splice(id, 1);
      setNotes([...notes]);
      services.deleteNote(noteId);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleNoteUpdate = async (noteIdx, noteToDeleteId) => {
    const note = notes.filter((_note, id) => id === noteIdx);
    if (note) {
      try {
        const noteId = note[0].id;
        const selectedNoteIdx = notes.findIndex(
          (selected) => selected.id === noteId
        );
        setNoteToUpdate(note);
        // const request = await services.updateNote(noteToDeleteId);
        // console.log(request);

        notes.splice(selectedNoteIdx, 1);
        services.deleteNote(noteToDeleteId);

        setNotes([...notes]);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleUserReg = async (obj) => {
    await services.handleReg(obj);
  };

  const handleUserLogin = async (obj) => {
    const request = await services.handleLogin(obj);
    try {
      setUser(request);
      window.sessionStorage.setItem("user", JSON.stringify(request));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
      {!user ? (
        <div>
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
              <Route
                path="/login"
                element={<Login login={handleUserLogin} />}
              />
              <Route
                path="/register"
                element={<Registration register={handleUserReg} />}
              />
              {/* <Route
            path="/user-page"
            element={
              
            }
          /> */}
            </Routes>
          </BrowserRouter>
        </div>
      ) : (
        <div>
          <Container
            submit={handleNoteSubmit}
            noteToUpdate={noteToUpdate}
            notes={notes}
            deleteNote={handleNoteDelete}
            update={handleNoteUpdate}
          />
        </div>
      )}
    </div>
  );
}

export default App;
