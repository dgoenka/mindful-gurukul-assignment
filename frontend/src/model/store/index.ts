import { createEvent, createStore } from "effector";

export const updateAuth = createEvent();
export const auth = createStore(
  JSON.parse(localStorage.getItem("auth") || "{}"),
);
auth.on(updateAuth, (data) => {
  localStorage.setItem("auth", data);
  return data;
});
