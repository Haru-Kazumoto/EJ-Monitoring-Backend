import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * This api for get all user records from the database
   * 
   * @returns User[]
   */
  @Get('get-all')
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<User[]> {
    return await this.userService.users({});
  }

  /**
   * This api for creating user data (Sign up).
   * @param userData 
   * @returns 
   */
  @Post('sign-up')
  async signupUser(
    @Body() userData: { username: string; email: string; password: string },
  ): Promise<User> {
    return await this.userService.createUser(userData);
  }

  /**
   * Delete 1 record user by id
   * 
   * @param id 
   * @returns User
   */
  @Delete(':id')
  async deleteUser(@Param('id') id: any): Promise<User>{
    return await this.userService.deleteUser(id);
  }
}
