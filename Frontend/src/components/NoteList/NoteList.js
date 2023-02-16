import "./NoteList.css";

const NoteList = ({ notes, deleteNote, update }) => {
  return (
    <div className="container">
      <h1>Notes are listed here</h1>
      {notes.length > 0
        ? notes.map((note, idx) => (
            <div key={idx}>
              <div>
                <b>{note.title}</b>
                <p>{note.content}</p>
                <button onClick={() => deleteNote(idx)}>delete</button>{" "}
                <button onClick={() => update(idx)}>edit</button>
              </div>
              <hr />
            </div>
          ))
        : "Nothing is here!"}
    </div>
  );
};

export default NoteList;
