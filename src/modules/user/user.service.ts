import { Prisma, User } from '@prisma/client';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { response } from 'express';
import { PS_EXCEPTIONS } from 'src/shared/constants/postgres.constants';
import { Http2ServerResponse } from 'http2';
import { request } from 'https';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find user is user exists?
   * 
   * @param {userWhereUniqueInput} 
   * @returns {Promise<User[]>}
   */
  async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
     return await this.prisma.user.findUnique({
      where: userWhereUniqueInput
    });
  }

  // async users(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.UserWhereUniqueInput;
  //   where?: Prisma.UserWhereInput;
  //   orderBy?: Prisma.UserOrderByWithRelationInput;
  // }): Promise<User[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.user.findMany({
  //     skip,
  //     take,
  //     cursor,
  //     where,
  //     orderBy,
  //   });
  // }

  /**
   * Find all records user
   */
  async getAll(): Promise<User[]>{
    const data = await this.prisma.user.findMany();
    //Filtering data output and excluding password field
    data.filter((user) => {
      delete(user.password)
    })
    return data;
  }

  async getById(id: string): Promise<User>{
    const dataId = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    if(!dataId){
      throw new NotFoundException({
        message: `Id [${id}] not found.` 
      }) 
    }
    delete(dataId.password);
    return dataId;
  }

  /**
   * Create new 1 record user
   * 
   * @param {data} 
   * @returns {Promise<User>}
   */
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try{
      const isUsernameExists = await this.prisma.user.findUnique(
        {where: {username: data.username}}
      );
      //Check request if username is already exists, it will throwing error.
      if(isUsernameExists !== null){
        throw new BadRequestException([`Username [${data.username}] already exists`])
      }
      const userRecord = await this.prisma.user.create({data});
      delete(userRecord.password); //Exlucing password field from output
      return userRecord;
    } catch(error) {
      if(error instanceof Prisma.PrismaClientUnknownRequestError){
        throw new InternalServerErrorException(
          {
            statusCode: response.statusCode,
            message: PS_EXCEPTIONS['XX000']
          }
        )
      }
      throw error; //It will throwing global exception.
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
