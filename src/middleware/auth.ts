import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/client";

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
    const isAuthenticated = req.isAuthenticated();
    if (isAuthenticated) {
        res.redirect("/");
        return; 
    } else {
        next();
    }
}

// check chỉ có admin mới được truy cập vào AdminPage
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const isAuthenticated = req.isAuthenticated();
    if (!req.isAuthenticated()) {
        res.redirect("/user/login");
        return; 
    }
    const user = req.user as any;
    if (user.roleName === "ADMIN") {
        return next();
    } else {
        res.redirect("/");
    }
}

export const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {id: +id},
        select: {
            id: true,
            username: true,
            fullName: true,
            address: true,
            phone: true,
            avatar: true,
            role: {
                select: {
                    name: true
                }
            }
        }
    })

    // "Làm phẳng" (Flatten) bằng Javascript
    const {role, ...rest} = user;
    return {
        ...rest,
        roleName: role?.name
    };
}