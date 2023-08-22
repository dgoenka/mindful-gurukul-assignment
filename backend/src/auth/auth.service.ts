import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, AuthCredentials } from 'shared';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser({ username });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(user): Promise<AuthCredentials> {
    const issued_at = Date.now();
    const payload = { username: user.username, sub: user._id };
    console.log('process.env is:\n' + JSON.stringify(process.env, null, 2));
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '1d',
    });
    console.log('access_token is:\n' + JSON.stringify(access_token, null, 2));
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });
    console.log('refresh_token is:\n' + JSON.stringify(refresh_token, null, 2));
    let returnData = {
      access_token,
      refresh_token,
      issued_at,
      userData: user,
    } as unknown as AuthCredentials;
    console.log('returnData is:\n' + JSON.stringify(returnData, null, 2));

    return returnData;
  }

  async refreshToken(token: string) {
    console.log('in refreshToken, token is: ' + token);
    const decodedUser = this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    });
    console.log(
      'in refreshToken, verified is: ' + JSON.stringify(decodedUser, null, 2),
    );

    if (decodedUser) {
      const user = await this.usersService.getUser({
        username: decodedUser?.username,
      });
      console.log('in refreshToken, user is: ' + JSON.stringify(user, null, 2));
      if (!user) return null;
      return await this.login(decodedUser);
    }
  }
}
