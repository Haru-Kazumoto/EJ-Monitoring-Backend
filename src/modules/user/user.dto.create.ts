import { Status } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class UserDtoCreate{

    @IsNotEmpty({message: "Name cannot be empty!"})
    name: string;

    @IsNotEmpty({message: "Username cannot be empty!"})
    username: string;

    @IsNotEmpty({message: "Password cannot be empty!"})
    password: string;

    @IsNotEmpty({message: "Status user must filled!"})
    statusUser: Status;

    @IsNotEmpty({message: "Role id must filled!"})
    roleId: number

}