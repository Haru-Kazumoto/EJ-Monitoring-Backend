import { Injectable } from '@nestjs/common';
import { Author, PrismaClient } from '@prisma/client';

@Injectable()
export class AuthorService {
    constructor(private prisma: PrismaClient){}

    //TODO: Create complex crud

    async getAll(): Promise<Author[]>{
        const data = await this.prisma.author.findMany({
            include: {
                books: true,
                mediaSocial: true
            }
        })

        return data;
    }

}
