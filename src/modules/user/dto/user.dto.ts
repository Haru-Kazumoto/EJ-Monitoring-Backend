import { Expose , Exclude} from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class userFieldDto{

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class UserRecord{
    @Expose()
    id: number;
    @Expose()
    username: string;
    @Expose()
    email: string;
    @Exclude()
    password: string;
}