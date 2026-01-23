import { Request, Response } from "express";
import { getProductInfo } from "../../services/admin/product.service";

export const getClientProductPage = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await getProductInfo(id);
    res.render("client/product/show.ejs", { product });
}