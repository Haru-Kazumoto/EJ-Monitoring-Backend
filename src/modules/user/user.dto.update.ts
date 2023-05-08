import { Status } from "@prisma/client";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UserDtoUpdate {

    @IsNotEmpty({message: "Name must filled!"})
    name: string;

    @IsNotEmpty({message: "Username must filled!"})
    username: string;

    @IsNotEmpty({message: "Password must filled!"})
    password: string;

    @IsNotEmpty({message: "Status user must filled!"})
    statusUser: Status;

    @IsNumber()
    roleId?: number;
}