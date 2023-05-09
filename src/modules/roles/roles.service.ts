import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class RolesService {

    constructor(
        private prisma: PrismaService
    ){}

    /**
     * Get all role record ignore the deleted_at status.
     * 
     * @returns {Role[]}
     */
    async getAllRolesIgnoreDeletedAt(): Promise<Role[]>{
        return this.prisma.role.findMany();
    }

    /**
     * Display all the rolls records who has the deleted_at is null,
     * but if the record has deleted_id is not null
     * it means the record has deleted (soft delete),
     * and it will not displayed in this method.
     * 
     * @returns {Role[]}
     */
    async getAllRolesWithDeletedNull(): Promise<Role[]>{
        return await this.prisma.role.findMany({
            where:{
                deleted_at: null
            }
        });
    }

    /**
     * Display all the rolls records who has the deleted_at is filled,
     * but if the record has deleted_id null
     * it means the record not deleted yet,
     * and it will not displayed in this method.
     * 
     * @returns {Role[]}
     */
    async getAllRolesWithDeletedFilled(): Promise<Role[]>{
        return await this.prisma.role.findMany({
            where:{
                deleted_at: {
                    not: null
                }
            }
        })
    }

    async findRoleById(roleId: number): Promise<Role>{
        const role = await this.prisma.role.findUnique(
            {
                where: {
                    id_role: +roleId
                }
            }
        );

        if(!role || role.deleted_at){
            const message = role  
            ? [`Role of id ${roleId} is not found`]
            : [`Role of id ${roleId} is already deleted`]

            throw new BadRequestException([message]);
        };

        return role;
    }

    /**
     * Create role for user,
     * first it will find the unique field (username),
     * then if the username already exists it will thrown an BadRequestException.
     * 
     * @param roleCreateInput 
     * @returns {Role}
     */
    async createRoles(roleCreateInput: Prisma.RoleCreateInput): Promise<Role>{
        await this.prisma.role.findFirst({
            where: {
                name: roleCreateInput.name
            }
        }).then(isName => {
            if(isName !== null){
                throw new BadRequestException([`Role named '${roleCreateInput.name}' has been added!`]);
            }
        })
         
        return await this.prisma.role.create(
            {
                data: {
                    ...roleCreateInput
                }
            }
        );
    }
    
    /**
     * Update role by id ,
     * then id the role is exists it'll updated,
     * otherwise it will thrown an exception.
     * 
     * And if the id of role have deleted_at is not null (filled),
     * it will throw NotFoundException, it means the record has deleted.
     * 
     * @param roleIdToInput 
     * @param roleUpdateInput 
     * @returns {Role}
     */
    async updateRoleById(
        roleIdToInput: number,
        roleUpdateInput: Prisma.RoleUpdateInput): Promise<Role>{
        
        //Check the id, is the id is exists?
        await this.prisma.role.findUnique({
            where:{
                id_role: +roleIdToInput
            }
        })
        .then(isId => {
            if(isId === null){
                throw new NotFoundException([`Id ${roleIdToInput} not found!`])
            }
        });

        const isDeletedNull = await this.prisma.role.findUnique({
            where: {
                id_role: +roleIdToInput
            },
            select:{
                deleted_at: true
            }
        });

        //Check the data from id, is the role has deleted_at is filled?
        if(isDeletedNull && isDeletedNull.deleted_at !== null){
            throw new NotFoundException([`[${roleIdToInput}] The id of this record was deleted.`])
        }

        return await this.prisma.role.update({
            where:{
                id_role: +roleIdToInput
            },
            data: {
                ...roleUpdateInput,
                updated_at: new Date()
            }
        });
    }

    /**
     * This method is softdelete handle.
     * 
     * It will request the id of role and update the deleted_at from null to date
     * where it updated date. 
     * technically a role that has deleted_at filled or not null, 
     * says it has been deleted but not deleted in the database
     * 
     * @param roleIdToDelete 
     * @returns {Role}
     */
    async softDeleteRoleById(
        roleIdToDelete: number
    ): Promise<Role>{
        await this.prisma.role.findUnique({
            where: {
                id_role: +roleIdToDelete
            }
        }).then(isId => {
            if(isId === null){
                throw new NotFoundException([`Id ${roleIdToDelete} not found!`])
            }
        });

        const isDeletedNotNull = await this.prisma.role.findUnique(
            {
                where: {
                    id_role: +roleIdToDelete
                },
                select: {
                    deleted_at: true
                }
            }
        );
 
        if(isDeletedNotNull && isDeletedNotNull.deleted_at !== null){
            throw new BadRequestException([`[${+roleIdToDelete}] This record is has been deleted.`])
        }

        return await this.prisma.role.update({
            where:{
                id_role: +roleIdToDelete
            },
            data: {
                deleted_at: new Date(),
                updated_at: new Date()
            }
        })
    }   
}
