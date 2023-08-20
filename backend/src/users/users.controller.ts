import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('gender') gender: string,
    @Body('how_hear') how_hear: string,
    @Body('how_hear_other') how_hear_other: string,
    @Body('country') country: string,
    @Body('state') state: string,
    @Body('city') city: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      username,
      hashedPassword,
      gender,
      how_hear,
      how_hear_other,
      country,
      state,
      city,
    );
    return result;
  }
}
