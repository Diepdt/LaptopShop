import { Request, Response } from "express";

export const getClientProductPage = (req: Request, res: Response) => {
    const id = req.params;
    res.render("client/product/show.ejs", { id });
}