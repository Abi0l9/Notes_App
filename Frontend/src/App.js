import "./App.css";
import Container from "./components/Container/Container";
import NoteForm from "./components/NoteForm/NoteForm";
import NoteList from "./components/NoteList/NoteList";

function App() {
  return (
    <div className="">
      <Container>
        <NoteForm />
        <NoteList />
      </Container>
    </div>
  );
}

export default App;
