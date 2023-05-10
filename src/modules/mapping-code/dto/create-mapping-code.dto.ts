import { StatusCode, isActive } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class MappingCodeDto {
  @IsNotEmpty({ message: 'Code is required' })
  code: string;

  @IsNotEmpty({ message: 'Definition is required' })
  definition: string;

  @IsNotEmpty({ message: 'Status is required' })
  status: StatusCode;

  @IsNotEmpty({ message: 'Priority is required' })
  priority: number;

  @IsNotEmpty({ message: 'Active is required' })
  isActive: isActive;
}
