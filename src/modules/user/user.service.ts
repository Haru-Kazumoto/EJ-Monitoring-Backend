import { Prisma, User } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { response } from 'express';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find all records user
   * 
   * @param userWhereUniqueInput 
   * @returns unique
   */
  async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
     return await this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * Create new 1 record user
   * 
   * @param data 
   * @returns 
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    let errors=[];

    const isUsernameExists = await this.prisma.user.findUnique({where: {username: data.username}});
    if(isUsernameExists){
      errors.push({
        message: `username ${data.username} already exists`
      })
    }

    if(errors.length > 0) throw new BadRequestException(errors);
    
    return await this.prisma.user.create({data});
  }

  /**
   * Updating 1 record user
   * 
   * @param params 
   * @returns 
   */
  async updateUser(params: {where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput}): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({data,where,});
  }

  /**
   * Delete 1 record user
   * 
   * @param where 
   * @returns 
   */
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    let errors = [];
    const isIdExists = await this.prisma.user.findUnique({where: {id: where.id}});
    if(isIdExists === null){
      errors.push({
        statusCode: response.statusCode,
        message: `Id ${where.id} does not exist`
      })
    }
    if(errors.length > 0) throw new NotFoundException(errors);
    return await this.prisma.user.delete({where: {id: where.id}});
  }
}
