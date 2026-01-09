import { Request, Response } from "express";
import { getAllRoles, getAllUsers } from "../../services/user.service";

const getDashboardPage = async (req: Request, res: Response) => {
    res.render("admin/dashboard/show.ejs");
}

const getAdminUserPage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    const roles = await getAllRoles();
    res.render("admin/user/show.ejs", { users, roles });
}

export { getDashboardPage, getAdminUserPage };