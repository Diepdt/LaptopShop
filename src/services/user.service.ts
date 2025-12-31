import { prisma } from "../config/client";
import { ACCOUNT_TYPE } from "../config/constant";
import bcrypt from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, saltRounds);
}

const handleCreateUser = async (fullname: string, email: string, phone: string, avatar: string, address: string, role: string) => {
    const password = await hashPassword("123456");
    const createUser = await prisma.user.create({
        data: { username: email, password, fullName: fullname, address: address, phone: phone, accountType: ACCOUNT_TYPE.SYSTEM, avatar: avatar, roleId: +role } // +role : chuyen role tu string -> number
    });
}

const getAllUsers = async () => {
    const listUsers = await prisma.user.findMany();
    return listUsers;
}

const getAllRoles = async () => {
    const listRoles = await prisma.role.findMany();
    return listRoles;
}

const handleDeleteUser = async (id: string) => {
    const deleteUser = await prisma.user.delete({ where: { id: Number(id) } });
}

const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    return user;
}

const updateUserById = async (id: string, name: string, email: string, address: string) => {
    const updateUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { username: name, password: email, address: address }
    })
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById, getAllRoles, hashPassword }