import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaClient]
})
export class StudentModule {}
