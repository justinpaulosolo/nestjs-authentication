import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, COOKIE_SECRET } = process.env;
  app.use(
    session({
      secret: COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
      name: 'NEST_AUTH',
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  try {
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
