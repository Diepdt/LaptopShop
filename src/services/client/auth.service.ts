import { prisma } from "../../config/client"
import { ACCOUNT_TYPE } from "../../config/constant";
import { comparePassword, hashPassword } from "../user.service";

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

export const handleLogin = async (username: string, password: string, callback: any) => {
    // find user
    const user = await prisma.user.findUnique({
        where: { username }
    });
    if (!user) {
        console.log(`Username ${username} isn't exit!`);
        return callback(null, false, { message: "Username/password is incorrect!" });
    }

    // compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        console.log("Incorrect password!");
        return callback(null, false, { message: "Username/password is incorrect!" });
    }
    return callback(null, user);
}