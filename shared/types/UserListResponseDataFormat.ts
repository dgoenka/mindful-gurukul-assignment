import { UserContact } from "./UserContact";
export class UserListResponseDataFormat {
  offset: number;
  limit: number;
  count: number;
  data: Array<UserContact>;
}
