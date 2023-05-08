import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import MenusService from './menus.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [MenusController],
    providers: [
        MenusService,
        PrismaService
    ],
    exports: [MenusService]
})
export class MenusModule {}
