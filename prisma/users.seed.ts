import { Genre, PrismaClient } from "@prisma/client"

const db = new PrismaClient();

type User = {
    username: string
    email: string
    password: string
}

async function seed(){
    await Promise.all(
        getUser().map((user) => {
            return db.user.create({
                data: {
                    username: user.username,
                    password: user.password
                }
            })
        })
    )
}

function getUser(): Array<User>{
    return [
        {
            username: "admin1",
            email: "admin1@domain.com",
            password: "P@ssw0rd"
        },
        {
            username: "admin2",
            email: "admin2@domain.com",
            password: "P@ssw0rd"
        },
        {
            username: "admin3",
            email: "admin3@domain.com",
            password: "P@ssw0rd"
        }
    ]
}

seed()
.catch((e:any) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await db.$disconnect();
})