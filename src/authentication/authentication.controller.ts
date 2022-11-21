import {
  Controller,
  Post,
  Body,
  Request,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUpDto: CreateUserDto) {
    return this.authService.register(signUpDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return req.user;
  }
}
