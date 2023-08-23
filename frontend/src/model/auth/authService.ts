import { AxiosRequestConfig, AxiosResponse } from "axios";
import { User, AuthCredentials } from "shared";
import { instance } from "../axiosInstance";
import { createEffect, createEvent, createStore, Effect } from "effector";

export const signUp = createEffect(async (signUpData: User) => {
  console.log(
    "in signUp, signUpData is:\n" + JSON.stringify(signUpData, null, 2),
  );
  let data = JSON.stringify(signUpData);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL}/users/signup`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let response: AxiosResponse = await instance.request(config);

  return response.data;
});

export const login = createEffect(
  async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<Partial<AuthCredentials>> => {
    let data = JSON.stringify({ username, password });

    console.log(
      "in login effect, process.env.BASE_URL is: " + process.env.BASE_URL,
    );

    let config: AxiosRequestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    let response: AxiosResponse<Partial<AuthCredentials>> =
      await instance.request(config);

    return response.data;
  },
);

export const me = createEffect(async (): Promise<Partial<AuthCredentials>> => {
  console.log("in me effect, process.env.BASE_URL is: " + process.env.BASE_URL);

  let config: AxiosRequestConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.BASE_URL}/auth/me`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response: AxiosResponse<Partial<AuthCredentials>> =
    await instance.request(config);

  return response.data;
});

export const signOut = createEffect(
  async (): Promise<Partial<AuthCredentials>> => {
    console.log(
      "in login effect, process.env.BASE_URL is: " + process.env.BASE_URL,
    );

    let config: AxiosRequestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL}/auth/signOut`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    let response: AxiosResponse<Partial<AuthCredentials>> =
      await instance.request(config);

    return response.data;
  },
);
export const authCredentials = createStore<Partial<AuthCredentials> | null>(
  null,
);

export const updateCredentials = createEvent<Partial<AuthCredentials> | null>();

// @ts-ignore
authCredentials
  .on(updateCredentials, (_, creds) => creds)
  .on(login.done, (_, { result }) => result)
  .on(signOut.done, () => null)
  .on(me.done, (_, { result }) => result);
