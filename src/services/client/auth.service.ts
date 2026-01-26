import { prisma } from "../../config/client"
import { ACCOUNT_TYPE } from "../../config/constant";
import { hashPassword } from "../user.service";

export const registerNewUser = async (username: string, password: string, fullName: string, phone: string, address: string) => {
    const userRole = await prisma.role.findFirst({
        where: { name: "USER" }
    });
    const hash_password = await hashPassword(password);
    if (userRole) {
        await prisma.user.create({
            data: {
                username, password: hash_password, fullName, phone, address,
                accountType: ACCOUNT_TYPE.SYSTEM, roleId: userRole.id
            }
        });
    } else {
        throw new Error("User role không tồn tại.")
    }
}