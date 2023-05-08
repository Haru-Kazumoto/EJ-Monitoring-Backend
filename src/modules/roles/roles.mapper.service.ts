import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RoleDto } from './role.dto';

@Injectable()
export class RolesMapperService {

    constructor(){}

    mapToEntity(roleDto: RoleDto): Prisma.RoleCreateInput {
        const roleCreateInput: Prisma.RoleCreateInput = {
          name: roleDto.name,
          description: roleDto.description,
        };
        return roleCreateInput;
    }

}
