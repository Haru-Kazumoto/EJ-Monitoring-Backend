import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports:[PrismaModule],
  controllers: [RolesController],
  providers: [
    RolesService, 
    PrismaService
  ],
  exports:[RolesService]
})
export class RolesModule {}
