import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ){}

    async removeProperties(obj: any, properties: string[]): Promise<any> {
        return Object.assign({}, obj, properties.reduce((a, e) => (delete a[e], a), {}));
    }

    async getAllUserRecords(): Promise<User[]>{
        const dataUser = await this.prisma.user.findMany({
            include: {
                role: true
            }
        });
        dataUser.filter((data) => {
            delete(data.password);
            delete(data.created_date);
            delete(data.delete_date);
            delete(data.update_date);
        });

        return dataUser;
    } 

    async getAllUserRecordWithDeletedAtIsNull(): Promise<User[]> {
        return await this.prisma.user.findMany({
            where: {
                delete_date: null
            }
        })
    }

    async getAllUserRecordWithDeleteIsNotNull(): Promise<User[]>{
        return await this.prisma.user.findMany({
            where:{
                delete_date:{
                    not: null
                }
            }
        });
    }

    /**
     * Find user by id and check is the record has deleted or not/
     * 
     * @param userId 
     * @returns {User}
     */
    async findUserById(userId: number): Promise<User>{

        const user = await this.prisma.user.findUnique(
            {
                where: {
                    id_user: +userId
                }
            }
        );

        if(!user || user.delete_date){
            const message = user  
            ? [`User of id ${userId} is not found`]
            : [`User of id ${userId} is already deleted`]

            throw new BadRequestException([message]);
        }

        return user;
    }

    /**
     * Create user record and connecting role by id role.
     * Validate the username is already exists or not in database, 
     * also check the status enum from prisma, and validate the role
     * is the role exists, is the role not deleted.
     * 
     * @param userCreateInput 
     */
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        await this.prisma.user.findUnique({
            where:{
                username: data.username
            }
        }).then(user => {
            if(user !== null){
                throw new BadRequestException([`Username ${data.username} has already exists`]);
            }
        });

        // await this.prisma.role.findUnique({
        //     where:{
        //         id_role: +data.roleId
        //     }
        // }).then(role => {
        //     if(role === null){
        //         throw new NotFoundException([`Id ${data.roleId} is not exists!`]);
        //     }
        // });

        const isRoleHasDeleted = await this.prisma.role.findFirst({
            where:{
                deleted_at: null
            }
        });

        if(isRoleHasDeleted.deleted_at !== null){
            throw new BadRequestException([`Role with id ${data.roleId} has deleted.`]);
        }

        const result = await this.prisma.user.create({
            data:{
                ...data,
                role:{
                    connect: {
                        id_role: +data.roleId
                    }
                }
            },
            include: {
                role: true
            }
        });
        
        return result;
        
    }

    /**
     * Updating user and update the role if necessary
     * 
     * 
     * @param userPayload 
     * @param userId 
     */
    async updateUserById(UserUpdateInput: Prisma.UserUpdateInput, userId: number): Promise<User>{
        await this.prisma.user.findUnique({
            where:{
                id_user: userId
            }
        }).then(isId => {
            if(isId === null){
                throw new NotFoundException(['Id not found!']);
            }
        });

        const checkIsRecordHasDeleted = await this.prisma.user.findUnique({
            where:{
                id_user: +userId
            },
            select:{
                delete_date: true
            }
        });

        if(checkIsRecordHasDeleted && checkIsRecordHasDeleted.delete_date !== null){
            throw new BadRequestException([`This record of id ${userId} has deleted!`]);
        };

        return await this.prisma.user.update({
            where:{
                id_user: +userId
            },
            data:{
                ...UserUpdateInput,
                update_date: new Date()
            }
        });
    }
}
