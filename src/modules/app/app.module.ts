import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggingMiddleware } from '../middleware/logging.middleware';
import { AuthorModule } from '../author/author.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    AuthorModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggingMiddleware)
        .forRoutes('*');
  }
}
