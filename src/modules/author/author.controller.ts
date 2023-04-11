import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller()
export class AuthorController {
    constructor(private authorService: AuthorService) {}
    
}