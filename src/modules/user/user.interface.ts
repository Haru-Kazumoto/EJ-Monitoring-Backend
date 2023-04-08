export interface Message {
    statusCode: number;
    message: string;
    prismaError?: string;
}

export interface InternalServerErrorMessage {
    statusCodeServer: number;
    databaseError: string;
}