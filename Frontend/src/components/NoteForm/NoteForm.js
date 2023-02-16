import "./NoteForm.css";
const NoteForm = () => {
  return (
    <div className="noteForm">
      <h1>Notes Form goes here.</h1>
      <form>
        <label urlFor="title">Title</label>
        <input id="title" name="title" value=""/>
        <label urlFor="body">Content</label>
        <input id="body" name="body" value=""/>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NoteForm;
