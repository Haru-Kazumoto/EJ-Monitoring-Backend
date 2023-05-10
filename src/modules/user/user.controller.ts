import { Body, Controller, Get, Post, Put, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UserDtoCreate } from './user.dto.create';
import { UserDtoUpdate } from './user.dto.update';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Get('get-all')
    @UseGuards(JwtAuthGuard)
    public async getAllUserRecord(): Promise<User[]>{
        return await this.userService.getAllUserRecords();
    }

    @Get('get-all-deleted-null')
    @UseGuards(JwtAuthGuard)
    public async getAllUserWithDeletedNull(): Promise<User[]>{
        return await this.userService.getAllUserRecordWithDeletedAtIsNull();
    }

    @Get('get-all-deleted-not-null')
    @UseGuards(JwtAuthGuard)
    public async getAllUserWithDeletedIsNotNull(): Promise<User[]>{
        return await this.userService.getAllUserRecordWithDeleteIsNotNull();
    }

    @Post('create')
    public async createUser(
        @Body() userDtoCreate: UserDtoCreate
    ): Promise<User>{
        return await this.userService.createUser(userDtoCreate);
    }

    @Put('update-without-role/:id')
    @UseGuards(JwtAuthGuard)
    public async updateUserById(
        @Param('id') id: number,
        @Body() userDtoUpdate: UserDtoUpdate
    ): Promise<User>{
        return await this.userService.updateUserById(userDtoUpdate, id);
    }
}
