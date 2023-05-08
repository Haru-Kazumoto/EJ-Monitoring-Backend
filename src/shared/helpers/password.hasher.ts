import * as argon2 from "argon2"

const hash = async (password: string): Promise<string> => {
    const hashPassword = await argon2.hash(password, {
        type: argon2.argon2id
    });

    return hashPassword;
}

const verify = async (password: string, rawHashedPassword: string): Promise<boolean> => {
    const hashedPassword = await argon2.verify(password,rawHashedPassword, );

    return hashedPassword;
}

export const PasswordHashing = {
    hash, 
    verify
}