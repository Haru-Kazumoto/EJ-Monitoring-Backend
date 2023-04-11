import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Author } from '@prisma/client';
import { request, response } from 'express';

@Injectable()
export class AuthorService {
    constructor(private prisma: PrismaClient){}

    //TODO: Create complex crud


}
