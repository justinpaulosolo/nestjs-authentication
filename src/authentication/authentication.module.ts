import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './utils/serializer';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, SessionSerializer],
})
export class AuthenticationModule { }
