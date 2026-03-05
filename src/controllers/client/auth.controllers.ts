import { Request, Response } from "express"
import { createRegisterSchema } from "../../validations/register.validation";
import { registerNewUser } from "../../services/client/auth.service";

export const getUserRegisterPage = (req: Request, res: Response) => {
    const oldData = [];
    const errors = [];
    return res.render("user/register.ejs", { oldData, errors });
}

export const postRegister = async (req: Request, res: Response) => {
    const { username, password, confirmPassword, fullName, phone, address } = req.body;
    const validate = await createRegisterSchema.safeParseAsync(req.body);
    if (!validate.success) {
        const errorZod = validate.error.issues;
        const errors = errorZod.map(item => `${item.message} - ${item.path[0]}`);
        const oldData = { username, password, confirmPassword, fullName, phone, address };
        return res.render("user/register.ejs", { oldData, errors });
    }
    // success
    await registerNewUser(username, password, fullName, phone, address);
    return res.redirect("/user/login");
}

export const getUserLoginPage = (req: Request, res: Response) => {
    const { session } = req as any; // tại sao ép kiểu any sẽ không bị lỗi session
    const messages = session?.messages ?? []; // passport lưu vào session.messages
    // Xóa messages sau khi đã lấy để không hiển thị lại khi refresh
    delete session.messages;
    return res.render("user/login.ejs", { messages });
}

export const getAuthentication = (req: Request, res: Response) => {
    const user = req.user as any;
    if (user.roleName === "ADMIN") {
        res.redirect("/admin");
    } else {
        res.redirect("/");
    }
}
