import { createEvent, createStore, createEffect, sample } from "effector";
import { UserContact, UserListResponseDataFormat } from "shared";
import { sampleData } from "./sample";

export const addEditUser = createEvent<UserContact | null>();
export const userToBeAddedOrEditedStore = createStore<UserContact | null>(
  null,
).on(addEditUser, (_, user) => user);

export const nextSet = createEvent();

export const USER_LIST_FETCH_COUNT = 10;

const getUserContacts = createEffect<number, UserListResponseDataFormat, Error>(
  async (offset: number) => {
    // const url = `users/${offset}`;
    // const base = "https://jsonplaceholder.typicode.com";
    // const req = await fetch(`${base}/${url}`);
    const resData = JSON.parse(
      JSON.stringify(sampleData),
    ) as unknown as UserListResponseDataFormat;
    resData.data = resData.data.map((userContact) => {
      userContact.name = offset + " " + userContact.name;
      return userContact;
    });
    console.log("in getUserContacts, offset is:" + offset);
    resData.offset = offset;
    return resData;
  },
);

export const deleteUserContact = createEffect<UserContact, boolean, Error>(
  async (contactToDelete: UserContact) => {
    return true;
  },
);

export const userContacts = createStore<UserListResponseDataFormat | null>(null)
  .on(getUserContacts.doneData, (_, contactsData) => contactsData)
  .on(deleteUserContact.done, (contactsData, { params, result }) => {
    if (contactsData) {
      if (result) {
        contactsData.data = contactsData.data.filter((userContactInArr) => {
          //@ts-ignore
          return userContactInArr["_id"] !== params["_id"];
        });
      }
    }
  });
export const setCurrentOffset = createEvent<number>();

const $currentOffset = createStore<number>(0).on(
  setCurrentOffset,
  (_, offset) => offset,
);
$currentOffset.watch(() => nextSet());

sample({
  source: $currentOffset,
  clock: nextSet,
  target: getUserContacts,
});
