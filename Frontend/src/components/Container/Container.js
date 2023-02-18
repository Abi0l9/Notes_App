import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import "./Container.css";

const Container = ({
  submit,
  noteToUpdate,
  notes,
  deleteNote,
  update,
  logout,
  userName,
}) => {
  return (
    <div id="user-page">
      <div id="user-info">
        <h1>Notes</h1>
        <p>
          Welcome back, <b color="black">{userName}</b>{" "}
          <button onClick={logout}>Logout</button>
        </p>
      </div>
      <div id="container">
        <div id="content-body">
          <NoteForm submit={submit} noteToUpdate={noteToUpdate} />
          <NoteList
            id="note-list"
            notes={notes}
            deleteNote={deleteNote}
            update={update}
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
