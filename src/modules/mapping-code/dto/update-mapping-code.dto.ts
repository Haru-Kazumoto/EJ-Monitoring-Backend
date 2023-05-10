import { PartialType } from '@nestjs/mapped-types';
import { MappingCodeDto } from './create-mapping-code.dto';

export class UpdateMappingCodeDto extends PartialType(MappingCodeDto) {}
