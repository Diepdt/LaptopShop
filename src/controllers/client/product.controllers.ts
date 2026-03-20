import { Request, Response } from "express";
import { getProductInfo } from "../../services/admin/product.service";
import { addProductToCart } from "../../services/client/product.service";

export const getClientProductPage = async (req: Request, res: Response) => {
    const {id} = req.params;
    const product = await getProductInfo(id);
    res.render("client/product/show.ejs", { product });
}

export const postAddProductToCart = async (req: Request, res: Response) => {
    const {id} = req.params;
    const userId = req.user?.id;
    if (userId === null) {
        res.redirect("/user/login");
    } else {
        await addProductToCart(1, +id, userId);
    }
    res.redirect("/");
}

export const getCartPage = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (userId === null) {
        res.redirect("/user/login");
    }
    console.log(">>> cart");
    res.render("client/product/cart.ejs");
}