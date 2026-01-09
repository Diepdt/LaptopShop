import { Request, Response } from "express";

export const getAdminOrderPage = async (req: Request, res: Response) => {
    res.render("admin/order/show.ejs");
}