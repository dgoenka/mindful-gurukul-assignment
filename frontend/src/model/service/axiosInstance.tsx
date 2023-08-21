import axios from "axios";

console.log(
  "in axiosInstance, process env is:\n" + JSON.stringify(process.env, null, 2),
);
export const instance = axios.create({ baseURL: process.env.BASE_URL });
