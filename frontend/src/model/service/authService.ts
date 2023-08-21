import { AxiosResponse } from "axios";
import { createEffect } from "effector";
import { User } from "shared";
import { instance } from "./axiosInstance";
export const signUp = createEffect(async (signUpData: User) => {
  let data = JSON.stringify(signUpData);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "/users/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let response: AxiosResponse = await instance.request(config);

  return response.data;
});

export const login = createEffect(
  async (username: string, password: string) => {
    let data = JSON.stringify({ username, password });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    let response: AxiosResponse = await instance.request(config);

    return response.data;
  },
);
