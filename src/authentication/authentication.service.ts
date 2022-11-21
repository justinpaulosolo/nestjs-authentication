import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  async register(createUserDto: CreateUserDto) {
    let user: User;

    try {
      user = await this.usersService.create(createUserDto);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Error creating account');
    }

    delete user.password;

    return user;
  }

  async login(email: string, password: string) {
    console.log('calling login service');
    let user: User;
    try {
      user = await this.usersService.findOne({ where: { email } });
      console.log(user);
    } catch (err) {
      throw new UnauthorizedException('User not found');
    }

    if (!this.checkPassword(password, user.password)) {
      throw new UnauthorizedException('Wrong password');
    }

    delete user.password;

    console.log(user);
    return user;
  }

  async checkPassword(plainpassword: string, hashed: string) {
    return await bcrypt.compare(plainpassword, hashed);
  }
}
