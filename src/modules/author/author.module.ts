import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AuthorController],
  providers: [
    AuthorService,
    PrismaClient
  ]
})
export class AuthorModule {}
