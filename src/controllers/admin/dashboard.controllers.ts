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

const getAdminProductPage = async (req: Request, res: Response) => {
    res.render("admin/product/show.ejs");
}

const getAdminOrderPage = async (req: Request, res: Response) => {
    res.render("admin/order/show.ejs");
}

export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage };