import "./App.css";
import Container from "./components/Container/Container";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import services from "./services/requests";
import { useNavigate } from "react-router-dom";

function App() {
  let [notes, setNotes] = useState([]);
  let [noteToUpdate, setNoteToUpdate] = useState("");
  const [user, setUser] = useState("");
  const [activeUserName, setActiveUserName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      services.retrieveNotes().then((data) => {
        setNotes(data);
        setActiveUserName(user.username);
      });
    }
  }, [user]);

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

        notes.splice(selectedNoteIdx, 1);
        services.deleteNote(noteToDeleteId);

        setNotes([...notes]);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleUserReg = async (obj) => {
    try {
      await services.handleReg(obj);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUserLogin = async (obj) => {
    const request = await services.handleLogin(obj);
    try {
      setUser(request);
      services.setToken(request.token);
      window.sessionStorage.setItem("user", JSON.stringify(request));

      setTimeout(() => {
        navigate("/user-page");
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    window.sessionStorage.clear();
    setUser("");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="App">
      <div>
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
                userName={activeUserName}
                submit={handleNoteSubmit}
                noteToUpdate={noteToUpdate}
                notes={notes}
                logout={handleLogout}
                deleteNote={handleNoteDelete}
                update={handleNoteUpdate}
              />
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <Navigate replace to="/user-page" />
              ) : (
                <Navigate replace to="/register" />
              )
            }
          />
        </Routes>
      </div>
      <div></div>
    </div>
  );
}

export default App;
