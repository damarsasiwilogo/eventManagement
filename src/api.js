import axios from "axios";

let baseURL = "http://localhost:3001";
if (process.env.NODE_ENV === "production") {
  baseURL = "https://my-json-server.typicode.com/damarsasiwilogo/eventManagement";
}

const instance = axios.create({
  baseURL,
});

export default instance;
