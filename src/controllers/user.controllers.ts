import { Request, Response } from "express";
import { getAllUsers, getUserById, handleCreateUser, handleDeleteUser, updateUserById, getAllRoles } from "../services/user.service";

const getHomePage = async (req: Request, res: Response) => {
    // get all user from database
    const users = await getAllUsers();

    // render homepage
    res.render("home", { users: users });
}

const getCreateUser = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    res.render("admin/user/create", { roles })
}

const postCreateUserInfo = async (req: Request, res: Response) => {
    const { fullname, email, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
    // handleCreateUser
    await handleCreateUser(fullname, email, phone, avatar, address, role);
    console.log("Create a new user successfully!");

    res.redirect("/admin/user");
}

const postDeleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    // handleDeleteUser
    await handleDeleteUser(id);

    res.redirect("/admin/user");
}

const getUserInfo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await getUserById(id);
    const roles = await getAllRoles();
    res.render("admin/user/detail", { user, roles });
}

const updateUserInfo = async (req: Request, res: Response) => {
    await updateUserById(req.params.id, req.body.fullName, req.body.username, req.body.phone, req.body.address, req.body.role);
    res.redirect("/admin/user");
}

export { getHomePage, getCreateUser, postCreateUserInfo, postDeleteUser, getUserInfo, updateUserInfo }