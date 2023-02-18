import { useState } from "react";
import "./Login.css";

const Login = ({ login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const obj = { username, password };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(obj);
    setUsername("");
    setPassword("");
  };

  return (
    <div id="login-page">
      <h1>Login Page</h1>
      <div id="form">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
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
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <div id="new-user">
          New user? Sign Up<a href="/register"> here</a>!
        </div>
      </div>
    </div>
  );
};

export default Login;
