import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from '@prisma/client';

@Controller('author') //Base url /api/v1/author/**
export class AuthorController {
    constructor(private authorService: AuthorService) {}

    @Get('get-all')
    async getAllAuthor(): Promise<Author[]>{
        return await this.authorService.getAll();
    }

}