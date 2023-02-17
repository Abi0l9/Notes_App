import NoteForm from "../NoteForm/NoteForm";
import NoteList from "../NoteList/NoteList";
import "./Container.css";

const Container = ({ submit, noteToUpdate, notes, deleteNote, update }) => {
  return (
    <div>
      <h1>Notes</h1>
      <div className="container">
        <NoteForm submit={submit} noteToUpdate={noteToUpdate} />
        <NoteList notes={notes} deleteNote={deleteNote} update={update} />
      </div>
    </div>
  );
};

export default Container;
