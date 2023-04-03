import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller()
export class AuthorController {
    constructor(
        private authorService: AuthorService
    ) {}
    
    @Get('/author/hello')
    async getHello(): Promise<string>{
        return "Hello nestjs"
    }
}