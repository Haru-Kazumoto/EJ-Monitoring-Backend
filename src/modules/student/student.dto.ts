import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsNumber } from "class-validator";

export class StudentDto {
    @IsNotEmpty({message: "Name is required"})
    name: string;

    @IsNotEmpty({message: "Age is required"})
    @IsNumber()
    age: number;

    @IsNotEmpty({message: "Address is required"})
    address: Prisma.AddressCreateNestedOneWithoutStudentInput;
}