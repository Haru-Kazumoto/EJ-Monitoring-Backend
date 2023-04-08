import { Prisma, User } from '@prisma/client';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { response } from 'express';
import { Message } from './user.interface';
import { InternalServerErrorMessage } from './user.interface';
import { PRISMA_ERRORS } from 'src/shared/constants/prisma.constants';
import { PS_EXCEPTIONS } from 'src/shared/constants/postgres.constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find all records user
   * 
   * @param {userWhereUniqueInput} 
   * @returns {Promise<user[]>}
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
   * @param {data} 
   * @returns {Promise<User>}
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try{
      await this.prisma.user.findUnique(
        {where: {username: data.username}}
      );
      return await this.prisma.user.create({data});
    } catch(error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code === PRISMA_ERRORS.P2002){
          const errorMessage: Message = {
            statusCode: response.statusCode,
            message: `Username ${data.username} already exists`,
            prismaError: PRISMA_ERRORS.P2002.replace('{constraint}','username')
          }
          throw new BadRequestException(errorMessage);
        }
      } else if(error instanceof Prisma.PrismaClientUnknownRequestError){
        const errorMessage: InternalServerErrorMessage = {
          statusCodeServer: response.statusCode,
          databaseError: PS_EXCEPTIONS['XX000']
        }
        throw new InternalServerErrorException(errorMessage);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  /**
   * Updating 1 record user
   * 
   * @param {params} 
   * @returns {Promise<User>}}
   */
  async updateUser(params: {where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput}): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({data,where,});
  }

  /**
   * Delete 1 record user
   * 
   * @param {where} 
   * @returns {Promise<User>}
   */
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    let errors = [];
    const isIdExists = await this.prisma.user.findUnique({where: {id: where.id}});
    if(isIdExists === null ){
      errors.push({
        statusCode: response.statusCode,
        message: `Id ${where.id} does not exist`
      })
    }
    if(errors.length > 0) throw new NotFoundException(errors);
    return await this.prisma.user.delete({where: {id: where.id}});
  }
}
