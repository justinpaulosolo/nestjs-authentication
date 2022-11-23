import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string) {
    return this.authService.login(email, password);
  }
}
