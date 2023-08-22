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
    name: string,
    username: string,
    phone: string,
    password: string,
    gender: string,
    how_hear: string,
    how_hear_other: string,
    country: string,
    state: string,
    city: string,
  ): Promise<User> {
    return this.userModel.create({
      name,
      username,
      password,
      phone,
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
