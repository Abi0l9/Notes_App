import "./NoteForm.css";
import { useEffect, useRef, useState } from "react";

const NoteForm = ({ submit, noteToUpdate }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const updateBtnRef = useRef("");

  const newUpdate = noteToUpdate[0];

  useEffect(() => {
    if (noteToUpdate) {
      updateBtnRef.current.textContent = "Update";
      setTitle(newUpdate?.title || "");
      setContent(newUpdate?.content || "");
    }
  }, [newUpdate?.title, newUpdate?.content, noteToUpdate]);

  const submitNote = (e) => {
    e.preventDefault();
    submit({ title, content });
    setTitle("");
    setContent("");
    updateBtnRef.current.textContent = "Submit";
  };

  return (
    <div className="noteForm">
      <h3>Create your desired note</h3>
      <form onSubmit={submitNote}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength="5"
            required
          />
        </div>
        <div>
          <label htmlFor="body">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            min="15"
            required
          ></textarea>
        </div>
        <div>
          <button type="submit" ref={updateBtnRef}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
