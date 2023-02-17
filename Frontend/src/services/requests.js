import axios from "axios";

const userUrl = "/api/users";
const loginUrl = "/api/login";
const noteUrl = "/api/notes";

let token;

const configHandler = (tk) => {
  const config = {
    headers: {
      Authorization: tk,
    },
  };

  return config;
};

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const handleReg = async (obj) => {
  const request = await axios.post(userUrl, obj);
  return request.data;
};

const handleLogin = async (obj) => {
  const config = configHandler(token);

  const request = await axios.post(loginUrl, obj, config);
  return request.data;
};

const createNote = async (obj) => {
  const config = configHandler(token);

  const request = await axios.post(noteUrl, obj, config);
  return request.data;
};

const retrieveNotes = async () => {
  const config = configHandler(token);

  const request = await axios.get(noteUrl, config);
  return request.data;
};

const updateNote = async (id) => {
  const config = configHandler(token);

  const request = await axios.get(`${noteUrl}/${id}`, config);
  return request.data;
};

const deleteNote = async (id) => {
  const config = configHandler(token);

  const request = await axios.delete(`${noteUrl}/${id}`, config);
  return request.data;
};

// eslint-disable-next-line
export default {
  handleLogin,
  setToken,
  handleReg,
  createNote,
  retrieveNotes,
  updateNote,
  deleteNote,
};
