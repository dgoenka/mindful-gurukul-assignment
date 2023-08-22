import { User } from "./User";

export class AuthCredentials {
  access_token: string;
  refresh_token: string;
  issued_at: number;
  userData?: any;
}
