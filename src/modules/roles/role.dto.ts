import { IsNotEmpty } from "class-validator";

export class RoleDto{

    @IsNotEmpty({message: "Name cannot be empty field!"})
    name: string;

    @IsNotEmpty({message: "Desription cannot be empty field!"})
    description: string;

}