import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserSchema } from './users.model';
import { User } from 'shared';
@Injectable()
export class UsersService {
  userModel;
  constructor() {
    this.userModel = mongoose.model('User', UserSchema);
  }
  async createUser(
    username: string,
    password: string,
    gender: string,
    how_hear: string,
    how_hear_other: string,
    country: string,
    state: string,
    city: string,
  ): Promise<User> {
    return this.userModel.create({
      username,
      password,
      gender,
      how_hear,
      how_hear_other,
      country,
      state,
      city,
    });
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
}
