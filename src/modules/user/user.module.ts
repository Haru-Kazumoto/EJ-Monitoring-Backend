import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

import { UserController } from './user.controller';
import { UserListener } from './user.listener';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [PrismaService, UserListener, UserService],
  exports: [UserService],
})
export class UserModule {}
