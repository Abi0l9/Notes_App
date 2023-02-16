import "./NoteList.css";

const NoteList = ({ notes, deleteNote }) => {
  return (
    <div className="container">
      <h1>Notes are listed here</h1>
      {notes.length > 0
        ? notes.map((note, idx) => (
            <div key={idx}>
              <div >
              {note.title}
              <button onClick={() => deleteNote(idx)}>delete</button>
              </div>
            </div>
          ))
        : "Nothing is here!"}
    </div>
  );
};

export default NoteList;
