import { prisma } from "./client";
import { hashPassword } from "../services/user.service";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
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

    const countUser = await prisma.user.count();
    if (countUser > 0) {
        console.log("Already init user data!");
    } else {
        const adminRole = await prisma.role.findFirst({ where: { name: "ADMIN" } });
        const userRole = await prisma.role.findFirst({ where: { name: "USER" } });
        await prisma.user.createMany({
            data: [
                {
                    username: "Diepdt",
                    fullName: "Dương Tuấn Điệp",
                    address: "Ngọc Trục - Đại Mỗ - Nam Từ Liêm - Hà Nội",
                    phone: "0867545881",
                    password: await hashPassword("123456"),
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: adminRole?.id
                }, {
                    username: "Datnv",
                    fullName: "Nguyễn Văn Đạt",
                    address: "Trần Phú - Hà Đông - Hà Nội",
                    phone: "086453539",
                    password: await hashPassword("123456"),
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: userRole?.id
                }
            ]
        })
    }
}

export default initDatabase;