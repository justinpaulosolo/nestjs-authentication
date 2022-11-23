import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUpDto: CreateUserDto) {
    return this.authService.register(signUpDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Res() res: Response) {
    return res.sendStatus(HttpStatus.OK);
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  async status(@Req() req: Request, @Res() res: Response) {
    res.send(req.user);
  }
}
