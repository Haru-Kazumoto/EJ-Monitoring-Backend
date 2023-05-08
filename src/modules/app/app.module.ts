import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { LoggingMiddleware } from '../middleware/logging.middleware';
import { RolesModule } from '../roles/roles.module';
import { MenusModule } from '../menus/menus.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    RolesModule,
    MenusModule,
    ConfigModule.forRoot(
      { 
        isGlobal: true, 
        load: [
          () => GLOBAL_CONFIG
        ] 
      }
    ),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggingMiddleware)
        .forRoutes('*');
  }
}
