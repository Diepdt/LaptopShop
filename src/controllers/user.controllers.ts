import { Request, Response } from "express";
import { getAllUsers, getUserById, handleCreateUser, handleDeleteUser, updateUserById, getAllRoles } from "../services/user.service";
import { createUserSchema } from "../validations/user.validation";
import { getAllProducts } from "../services/admin/product.service";

const getHomePage = async (req: Request, res: Response) => {
    const products = await getAllProducts();
    console.log(products[0]);
    res.render("client/home/show.ejs", {products});
}

const getCreateUser = async (req: Request, res: Response) => {
    const roles = await getAllRoles();
    const errors = [];
    const data = {fullname: "", email: "", phone: "", role: "", address: ""};
    res.render("admin/user/create", { roles, errors, data })
}

const postCreateUserInfo = async (req: Request, res: Response) => {
    const validation = createUserSchema.safeParse(req.body);
    if (!validation.success) {
        const errors = validation.error.flatten().fieldErrors;
        const roles = await getAllRoles();
        return res.render("admin/user/create.ejs", {
            errors,
            roles,
            data: req.body // Trả lại dữ liệu cũ để không bị mất form
        });
    }
        
    // handleCreateUser
    const { fullname, email, phone, role, address } = req.body;
    const file = req.file;
    const avatar = file?.filename ?? null;
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
    const validation = createUserSchema.safeParse(req.body);
    const errors = validation.error.flatten().fieldErrors;
    res.render("admin/user/detail", { user, roles, errors });
}

const updateUserInfo = async (req: Request, res: Response) => {
    const file = req.file;
    const avatar = file?.filename ?? undefined;
    await updateUserById(req.params.id, req.body.fullName, req.body.username, req.body.phone, req.body.address, req.body.role, avatar);
    res.redirect("/admin/user");
}

export { getHomePage, getCreateUser, postCreateUserInfo, postDeleteUser, getUserInfo, updateUserInfo }