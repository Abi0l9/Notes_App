import "./NoteForm.css";
import { useState } from "react";

const NoteForm = ({ submit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitNote = (e) => {
    e.preventDefault();
    submit({ title, content });
    setTitle("");
    setContent("")
  };

  return (
    <div className="noteForm">
      <h1>Notes Form goes here.</h1>
      <form onSubmit={submitNote}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
