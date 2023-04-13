import { HttpStatus } from "@nestjs/common";

export interface Message {
    status: HttpStatus;
    message: string;
}