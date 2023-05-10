import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
// import { MappingcodeService } from './mappingcode.service';
// import { MappingCodeDto } from './dto/create-mappingcode.dto';
import { Mappingcode } from '@prisma/client';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { MappingcodeService } from './mapping-code.service';
import { MappingCodeDto } from './dto/create-mapping-code.dto';

@Controller('mappingcode')
@UseGuards(JwtAuthGuard)
export class MappingcodeController {
  constructor(private readonly mappingcodeService: MappingcodeService) {}

  @Post('create')
  async createRecord(
    @Body() mappingcode: MappingCodeDto,
  ): Promise<Mappingcode> {
    return await this.mappingcodeService.create(mappingcode);
  }

  @Get()
  async findAllCode() {
    return this.mappingcodeService.findAllCode();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.mappingcodeService.getCodeById(+id);
  }

  @Put('update/:id')
  async updateRecord(
    @Param('id') id: any,
    @Body() mappingcode: MappingCodeDto,
  ): Promise<Mappingcode> {
    return await this.mappingcodeService.updateMappingCode(id, mappingcode);
  }

  @Put('delete/:id')
  remove(@Param('id') id: string) {
    return this.mappingcodeService.deleteMappingCode(+id);
  }
}
