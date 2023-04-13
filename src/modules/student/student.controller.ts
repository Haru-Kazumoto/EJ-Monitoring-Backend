import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { Prisma, Student } from '@prisma/client';
import { StudentDto } from './student.dto';

@Controller('student')
export class StudentController {
    constructor(private readonly service: StudentService){}

    @Get('get-all')
    async getAllRecord(): Promise<Student[]>{
        return await this.service.getAllStudent();
    }

    @Get(':id')
    async getRecordById(@Param('id') id: any): Promise<Student>{
        return await this.service.getStudentById(id);
    }

    @Post('create')
    async createRecord(@Body() student: StudentDto): Promise<Student>{
        return await this.service.createStudent(student);
    }

    @Put('update/:id')
    async updateRecord(
        @Param('id') id: any,
        @Body() student: StudentDto
    ): Promise<Student>{
        return await this.service.updateStudent(id, student);
    }
}
