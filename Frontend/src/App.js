import "./App.css";
import Container from "./components/Container/Container";
import { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import services from "./services/requests";
import { useNavigate } from "react-router-dom";

function App() {
  let [notes, setNotes] = useState([]);
  let [noteToUpdate, setNoteToUpdate] = useState("");
  const [user, setUser] = useState("");
  const [activeUserName, setActiveUserName] = useState("");
  const notification = useRef("");
  let navigate = useNavigate();

  const activateNotification = (message, styles) => {
    const stylesList = styles.slice();
    notification.current.textContent = message;
    notification.current.classList.add(...stylesList);

    setTimeout(() => {
      notification.current.classList.remove(...stylesList);
      notification.current.textContent = "";
    }, 5000);
  };

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
    const message = "Note saved successfully!";
    const styles = ["visible", "greenBg"];
    activateNotification(message, styles);
  };

  const handleNoteDelete = (id, noteId) => {
    try {
      notes.splice(id, 1);
      setNotes([...notes]);
      services.deleteNote(noteId);
      const message = "Note deleted successfully!";
      const styles = ["visible", "greenBg"];
      activateNotification(message, styles);
    } catch (error) {
      const message = "Can't delete note";
      const styles = ["visible", "redBg"];
      activateNotification(message, styles);
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

      const message =
        "Registration Successful! You will be redirected to login page in few seconds.";
      const styles = ["visible", "greenBg"];
      activateNotification(message, styles);

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      const styles = ["visible", "redBg"];
      console.log(error.message);

      if (error.message.indexOf(400)) {
        activateNotification(
          "User already exists, you will be redirected to login page.",
          styles
        );

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        activateNotification(error.message, styles);
      }
    }
  };

  const handleUserLogin = async (obj) => {
    try {
      const request = await services.handleLogin(obj);
      setUser(request);
      services.setToken(request.token);
      window.sessionStorage.setItem("user", JSON.stringify(request));

      const message = "Successful! You will be redirected to your dashboard.";
      const styles = ["visible", "greenBg"];
      activateNotification(message, styles);

      setTimeout(() => {
        navigate("/user-page");
      }, 3000);
    } catch (error) {
      const styles = ["visible", "redBg"];
      activateNotification("Invalid credentials provided", styles);
    }
  };

  const handleLogout = () => {
    window.sessionStorage.clear();
    setUser("");

    const styles = ["visible", "greenBg"];
    activateNotification("👋🏽 see you again!", styles);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="App">
      <div id="slide" ref={notification}></div>
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
      <footer id="dev">
        <span>App developed by</span>
        <Link to="https://github.com/Abi0l9/Notes_App.git">Al-Khalifah😍</Link>
      </footer>
    </div>
  );
}

export default App;
