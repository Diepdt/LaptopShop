import { prisma } from "../config/client";

const handleCreateUser = async (fullname: string, email: string, phone: string, role: string, avatar, address: string) => {
    const createUser = await prisma.user.create({
        data: { username: email, password: email, fullName: fullname, address: address, phone: phone, accountType: role, avatar: avatar }
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

export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById, getAllRoles }