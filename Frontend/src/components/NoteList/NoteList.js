import "./NoteList.css";

const NoteList = ({ notes }) => {
  return (
    <div className="container">
      <h1>Notes are listed here</h1>
      {notes.length > 0
        ? notes.map((note, idx) => <div key={idx}>{note.title}</div>)
        : "Nothing is here!"}
    </div>
  );
};

export default NoteList;
