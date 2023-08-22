import axios from "axios";

console.log(
  "in axiosInstance,  process.env.BASE_URL is:" + process.env.BASE_URL,
);
export const instance = axios.create({
  baseURL: process.env.BASE_URL,
});
