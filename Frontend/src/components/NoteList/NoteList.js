import "./NoteList.css";

const NoteList = ({ notes, deleteNote, update }) => {
  console.log(notes);
  return (
    <div id="noteContainer">
      <h3>List of created notes</h3>
      {notes.length > 0
        ? notes.map((note, idx) => (
            <div id="list" key={idx}>
              <div>
                <h4>{note.title}</h4>
                <p>{note.content}</p>
                <p className="date">{note.date}</p>
                <div id="btnArea">
                  <button
                    id="deleteBtn"
                    onClick={() => deleteNote(idx, note.id)}
                  >
                    delete
                  </button>{" "}
                  <button id="editBtn" onClick={() => update(idx, note.id)}>
                    edit
                  </button>
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
