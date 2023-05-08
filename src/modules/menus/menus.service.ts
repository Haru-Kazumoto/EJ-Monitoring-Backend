import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class MenusService {

    constructor(
        private prisma: PrismaService
    ){}

    /**
     * Get all menus record ignore deleted_at
     */
    

    /**
     * Get all menus record with deleted_at is null (not deleted)
     */
    // async ...

    /**
     * Get all menus recrod with deleted_at is not null (has deleted)
     */
    // async ...

    /**
     * Get menus by id , and check the menus record is deleted or not
     */
    // async ...

    /**
     * Create menus record 
     */
    // async ...

    /**
     * Update menus by id and check the record of menu
     * is already deleted or not, if has deleted it will
     * throw an exception
     */
    // async ...

    /**
     * Delete menus record by id and check the record 
     * is the record already deleted or not , if already it will
     * thrown an exception
     */
    // async ...

}
