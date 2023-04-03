import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AppModule } from './modules/app/app.module';
import { API_PREFIX } from './shared/constants/global.constants';
import { GLOBAL_CONFIG } from './configs/global.config';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalFilters(new InvalidFormExceptionFilter());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    }),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || GLOBAL_CONFIG.nest.port;
  await app.listen(PORT); 
  Logger.log(`Nest running on port http://localhost${PORT}`, "Nest Server");
}
bootstrap();
