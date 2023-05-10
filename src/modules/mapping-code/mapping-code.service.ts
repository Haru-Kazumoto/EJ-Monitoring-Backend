import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
// import { CreateMappingcodeDto } from './dto/create-mappingcode.dto';
// import { UpdateMappingcodeDto } from './dto/update-mappingcode.dto';
import { Mappingcode, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { response } from 'express';
import { PS_EXCEPTIONS } from 'src/shared/constants/postgres.constants';
// import { Message } from '../interface/message.interface';

@Injectable()
export class MappingcodeService {
  constructor(private prisma: PrismaService) { }

  /**
  * Create Mapping Code record.
  * @param userCreateInput 
  */

  async create(data: Prisma.MappingcodeCreateInput): Promise<Mappingcode> {
      return this.prisma.mappingcode.create({
        data:{
          ...data
        }
      });
  }


  /**
  *Get All Mapping Code Record With Deleted_at IsNull
  */

  async findAllCode() {
    return await this.prisma.mappingcode.findMany({
      where: {
        deleted_at: null
      }
    })
  }


  /**
  * Find Code by id and check is the record has deleted or not/
  * @param userId 
  * @returns {User}
  */

  async getCodeById(id: number): Promise<Mappingcode> {
    const findIdMappingCode = await this.prisma.mappingcode.findUnique({
      where: { id },
    });

    if (findIdMappingCode === null) {
      throw new NotFoundException([`Id ${id} not found!`])
    }

    if (!findIdMappingCode || findIdMappingCode.deleted_at) {
      const message = findIdMappingCode
        ? [`Code of id ${id} is not found`]
        : [`Code of id ${id} is already deleted`]

      throw new BadRequestException([message]);
    }
    return findIdMappingCode;
  }


  /**
  * Update Mapping Code
  */

  async updateMappingCode(
    id: number,
    data: Prisma.MappingcodeUpdateInput,
  ): Promise<Mappingcode> {
    const findIdMappingCode = await this.prisma.mappingcode.findUnique({
      where: {
        id: +id,
      },
    });

    if (findIdMappingCode === null) {
      throw new NotFoundException([`Id ${id} not found!`])
    }

    const isDeletedNotNull = await this.prisma.mappingcode.findUnique(
      {
        where: {
          id: +id,
        },
        select: {
          deleted_at: true,
        }
      }
      )

      if (isDeletedNotNull && isDeletedNotNull.deleted_at !== null) {
        throw new BadRequestException(`[${+id}] This record is has been deleted`)
      }
  
    return await this.prisma.mappingcode.update({
      where: {
        id: +id,
      },
      data: { ...data },
    });
  }

  
  /**
  *Update mapping code by changing column deleted_at null to datetime
  *and check if data with id is not available, then throw error not found
  */

  async deleteMappingCode(id: number): Promise<Mappingcode> {
    const findIdMappingCode = await this.prisma.mappingcode.findUnique({
      where: {
        id: +id,
      },
    });

    if (findIdMappingCode === null) {
      throw new NotFoundException([`Id ${id} not found!`])
    }

    const isDeletedNotNull = await this.prisma.mappingcode.findUnique(
      {
        where: {
          id: +id,
        },
        select: {
          deleted_at: true,
        }
      }
    );

    if (isDeletedNotNull && isDeletedNotNull.deleted_at !== null) {
      throw new BadRequestException(`[${+id}] This record is has been deleted`)
    }

    return this.prisma.mappingcode.update({
      where: {
        id: +id,
      },
      data: {
        deleted_at: new Date(),
        updated_at: new Date()
      }
    })
  }
}
