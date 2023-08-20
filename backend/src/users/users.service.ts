import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
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
