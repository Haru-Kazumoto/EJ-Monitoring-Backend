import * as argon2 from "argon2"

const hash = async (password: string): Promise<string> => {
    const hashPassword = await argon2.hash(password, {
        type: argon2.argon2id
    });

    return hashPassword;
}

const verify = async (password: string, rawHashedPassword: string): Promise<boolean> => {
<<<<<<< HEAD
    const hashedPassword = await argon2.verify(rawHashedPassword,password);
=======
    const hashedPassword = await argon2.verify(rawHashedPassword, password );
>>>>>>> 91190f2bc7531fc521ac536eecad98d536224531

    return hashedPassword;
}

export const PasswordHashing = {
    hash, 
    verify
}