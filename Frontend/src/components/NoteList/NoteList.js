import "./NoteList.css";

const NoteList = ({ notes, deleteNote, update }) => {
  return (
    <div className="container">
      <h1>Notes</h1>
      {notes.length > 0
        ? notes.map((note, idx) => (
            <div key={idx}>
              <div>
                <b>{note.title}</b>
                <p>{note.content}</p>
                <div id="btnArea">
                  <button onClick={() => deleteNote(idx, note.id)}>
                    delete
                  </button>{" "}
                  <button onClick={() => update(idx, note.id)}>edit</button>
                </div>
              </div>
              <hr />
            </div>
          ))
        : "Nothing is here!"}
    </div>
  );
};

export default NoteList;
