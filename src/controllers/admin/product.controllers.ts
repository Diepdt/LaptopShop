import { Request, Response } from "express";
import { getAllProducts, handleCreateProduct } from "../../services/product.service";

export const getAdminProductPage = async (req: Request, res: Response) => {
    const products = await getAllProducts();
    res.render("admin/product/show.ejs", { products });
}

export const getCreateProduct = (req: Request, res: Response) => {
    res.render("admin/product/create.ejs");
}

export const postCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, sold, factory, target } = req.body;
    const file = req.file;
    const productImage = file?.filename ?? null;
    await handleCreateProduct(name, price, detailDesc, shortDesc, quantity, sold, factory, target, productImage);
    res.redirect("/admin/product");
}