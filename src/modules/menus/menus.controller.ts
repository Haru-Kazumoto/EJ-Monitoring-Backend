import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

@Controller('menus')
@UseGuards(JwtAuthGuard)
export class MenusController {
    constructor(
        
    ){}
}
