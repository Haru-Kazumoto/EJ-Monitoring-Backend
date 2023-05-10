import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

enum Status {
    AKTIF="Aktif",
    TIDAK_AKTIF="Tidak Aktif"
}

interface User {
    name:string;
    username:string;
    password:string;
    statusUser:Status
    roleId:number;
}

interface Role{
    name:string;
    description:string;
}

const roles: Role[] = [
    {
      name: 'admin',
      description: 'Administrator',
    },
    {
      name: 'user',
      description: 'User',
    },
];

const users: User[] =[
    {
        name: "Zia",
        username: "jiaww",
        password: "qwerty",
        statusUser: Status.AKTIF,
        roleId: 1
    },
    {
        name: "Devina",
        username: "Depzz",
        password: "qwerty",
        statusUser: Status.AKTIF,
        roleId: 2
    }
];

