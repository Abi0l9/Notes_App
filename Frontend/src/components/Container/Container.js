import "./Container.css";

const Container = (props) => {
  return (
    <div>
      <h1>Notes</h1>
    <div className="container">
      {props.children}
    </div>
    </div>
  );
};

export default Container;
