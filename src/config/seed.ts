import { prisma } from "./client";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    if (countUser > 0) {
        console.log("Already init user data!");
    } else {
        await prisma.user.createMany({
            data: [
                {
                    username: "Diepdt",
                    password: "123456",
                    accountType: "admin"
                }, {
                    username: "Datnv",
                    password: "12345",
                    accountType: "admin"
                }
            ]
        })
    }

    const countRole = await prisma.role.count();
    if (countRole > 0) {
        console.log("Already init role data!");
    } else {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền."
                }, {
                    name: "USER",
                    description: "User thông thường."
                }
            ]
        })
    }
}

export default initDatabase;