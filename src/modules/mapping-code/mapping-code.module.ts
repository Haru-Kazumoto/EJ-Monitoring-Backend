import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserListener } from '../user/user.listener';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaClient } from '.prisma/client';
import { MappingcodeController } from './mapping-code.controller';
import { MappingcodeService } from './mapping-code.service';

@Module({
  imports: [PrismaModule],
  controllers: [MappingcodeController],
  providers: [MappingcodeService, PrismaService, UserListener, PrismaClient],
  exports: [MappingcodeService],
})
export class MappingcodeModule {}
