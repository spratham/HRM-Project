import api from "./api";

const login = (email, password) => {
  return api.post("/login", {
    email: email,
    password: password,
  });
};

const register = (firstname, lastname, email, password) => {
  return api.post("/register", {
    name: firstname + " " + lastname,
    email: email,
    password: password,
  });
};

export default { login, register };
