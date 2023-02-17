import axios from "axios";

const userUrl = "/api/users";
const loginUrl = "/api/login";
const noteUrl = "/api/notes";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const handleReg = async (obj) => {
  const request = await axios.post(userUrl, obj);
  return request.data;
};

const handleLogin = async (obj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = await axios.post(loginUrl, obj, config);
  return request.data;
};

const createNote = async (obj) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = await axios.post(noteUrl, obj, config);
  return request.data;
};

const retrieveNotes = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = await axios.get(noteUrl, config);
  return request.data;
};

const updateNote = (obj) => {};

const deleteNote = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

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
