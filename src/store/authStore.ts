import axios from "../api/axios.ts";


export const login = async (username: string, password: string) => {
  const response = await axios.post("/auth/login", { username, password });
  const { token } = response.data; 

  localStorage.setItem("token", token);
  return token;
};

