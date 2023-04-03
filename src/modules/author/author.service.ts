import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Author } from '@prisma/client';
import { request, response } from 'express';

@Injectable()
export class AuthorService {
    constructor(
        private prisma: PrismaClient
    ){}

    //Create record
    async create(author: Prisma.AuthorCreateInput): Promise<Author>{
        const errors = [];
        const isEmailExists = await this.prisma.author.findUnique({where: {email: author.email}});
        
        if(isEmailExists){
            response.status(500).send(
                errors.push({
                    status: request.statusCode,
                    message: "Email already exists"
                })
            )
        } else {
            return await this.prisma.author.create({
                data: author,
                include: {
                    books: true,
                    mediaSocial: true
                }
            })
        }

        if(errors.length > 0){
            throw new ForbiddenException(errors);
        }
    }

    //Get All Record
    async getAllRecord(): Promise<Author[]>{
        return this.prisma.author.findMany({
            include: {
                books: true,
                mediaSocial: true
            }
        })
    }

    //Get Records by id 
    async findById(id: number): Promise<Author>{
        const errors = [];
        const findRecord = await this.prisma.author.findUnique({
            where: {id},
            include: {
                books: true,
                mediaSocial: true
            }
        })
        if(!findRecord) response.status(404).send(
            errors.push({
                status: request.statusCode,
                message: `Record id ${id} doesn't exists!`
            })
        )

        if(errors.length > 0){
            throw new NotFoundException(errors);
        }

        return findRecord;
    }
}
