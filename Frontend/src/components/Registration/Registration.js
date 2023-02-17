import { useState } from "react";

const Registration = ({ register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const obj = { name, email, username, password };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(obj);
    setUsername("");
    setPassword("");
    setEmail("");
    setName("");
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full name:</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            minLength="4"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            minLength="4"
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            minLength="4"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            minLength="4"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
