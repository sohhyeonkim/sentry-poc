import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from "@sentry/node";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

}
bootstrap();
