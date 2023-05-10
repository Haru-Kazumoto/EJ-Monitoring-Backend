import { 
    Body, 
    Controller, 
    Get, 
    Post, 
    BadRequestException, 
    HttpStatus, 
    Put, 
    Param, 
    Patch, 
    UseGuards 
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from '@prisma/client';
import { RoleDto } from './role.dto';
import { validate } from 'class-validator';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

@Controller('roles')
// @UseGuards(JwtAuthGuard)
export class RolesController {

    constructor(
        private readonly roleService: RolesService
    ){}

    /**
     * Get all role record 
     * 
     * @returns {Role[]}
     */
    @Get('get-all')
    public async getAllRolesRecordIgnoreDeletedAt(): Promise<Role[]>{
        return this.roleService.getAllRolesIgnoreDeletedAt();
    }

    /**
     * Get record who had deleted at is null
     * 
     * @returns {Role[]}
     */
    @Get('get-all-deleted-null')
    public async getAllRolesWithDeletedAtIsNull(): Promise<Role[]>{
        return this.roleService.getAllRolesWithDeletedNull();
    }

    /**
     * 
     * @returns {Role[]}
     */
    @Get('get-all-deleted-filled')
    public async getAllRolesWithDeletedAtIsFilled(): Promise<Role[]>{
        return this.roleService.getAllRolesWithDeletedFilled();
    }

    @Post('create')
    public async createRolesRecord(
        @Body() roleDto: RoleDto
    ): Promise<Role>{
        const errors = await validate(roleDto);
        if(errors.length > 0){
            throw new BadRequestException([errors]);
        }

        return this.roleService.createRoles(roleDto);
    }

    @Put('update/:id')
    public async updateRoleById(
        @Param('id') id: number,
        @Body() roleDto: RoleDto
    ): Promise<RoleDto>{
        const errors = await validate(roleDto);
        if(errors.length > 0){
            throw new BadRequestException([errors]);
        }

        return this.roleService.updateRoleById(id, roleDto);
    }

    @Patch('/delete/:id')
    public async deleteRecordBySoftDelete(@Param('id') id: number): Promise<Role>{
        return this.roleService.softDeleteRoleById(id);
    }

}
