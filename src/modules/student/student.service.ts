import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, Student } from '@prisma/client';
import { Message } from '../interface/message.interface';
import { NotFoundError } from 'rxjs';

@Injectable()
export class StudentService {
    constructor(private prisma: PrismaClient){}

    async getAllStudent(): Promise<Student[]>{
        return await this.prisma.student.findMany({
            include: {
                address: true
            }
        });
    };

    async getStudentById(id: any): Promise<Student>{
        const findIdStudent = await this.prisma.student.findUnique({
            where: {id},
            include: {address: true}
        });
        if(findIdStudent === null){
            const errorMessage: Message={
                status: HttpStatus.NOT_FOUND,
                message: `Id ${id} not found!`
            };
            throw new BadRequestException(errorMessage);
        };
        return findIdStudent;
    }

    async createStudent(data: Prisma.StudentCreateInput): Promise<Student>{ 
        return await this.prisma.student.create({
            data: {
                ...data,
                address: {
                    create: {...data.address}
                } as Prisma.AddressCreateNestedOneWithoutStudentInput
            },
            include: {
                address: true
            }
        });
    };

    async updateStudent(id: any, data: Prisma.StudentUpdateInput): Promise<Student>{
        const findIdStudent = await this.prisma.student.findUnique({where: {id}});
        if(findIdStudent === null){
            let error: Message = {
                status: HttpStatus.NOT_FOUND,
                message: `Id ${id} not found!`
            };
            throw new NotFoundException(error);
        };

        return await this.prisma.student.update({
            where: {id},
            data: {...data},
            include: {address: true}
        });
    }
};
