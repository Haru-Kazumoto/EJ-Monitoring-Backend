import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { RolesService } from './roles.service';
import { identity } from 'rxjs';

describe('RoleService', () => {
  let roleService: RolesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: PrismaService,
          useValue: {
            role: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    roleService = module.get<RolesService>(RolesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createRoles', () => {
    it('should create a new role', async () => {
      const roleCreateInput = {
        name: 'Admin',
        description: 'Admin role',
      };
      const role = { ...roleCreateInput, id: '1' };
      (prismaService.role.findFirst as jest.Mock).mockResolvedValue(null);
      (prismaService.role.create as jest.Mock).mockResolvedValue(role);

      const result = await roleService.createRoles(roleCreateInput);

      expect(result).toEqual(role);
      expect(prismaService.role.findFirst).toHaveBeenCalledWith({
        where: {
          name: roleCreateInput.name,
        },
      });
      expect(prismaService.role.create).toHaveBeenCalledWith({
        data: roleCreateInput,
      });
    });

    it('should throw an error when the role name is already taken', async () => {
      const roleCreateInput = {
        name: 'Admin',
        description: 'Admin role',
      };
      (prismaService.role.findFirst as jest.Mock).mockResolvedValue({});

      await expect(roleService.createRoles(roleCreateInput)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error when the id of role is not found', async () => {
      const roleCreateInput = {
        name: 'ADMIN',
        description: "ADMIN EJ MONITORING"
      };
      const role = {...roleCreateInput, id_role: '1'};
      (prismaService.role.findUnique as jest.Mock).mockResolvedValue(role);
      // Create find role by id

      expect(prismaService.role.findUnique).toHaveBeenCalledWith({
        
      })
    });
  });
});