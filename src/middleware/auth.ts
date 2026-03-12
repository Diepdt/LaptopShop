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
    if (req.path.startsWith("/admin")) {
        if (!req.isAuthenticated()) {
            res.redirect("/user/login");
            return;
        }
        const user = req.user as any;
        if (user.roleName === "ADMIN") {
            return next();
        } else {
            res.render("status/403.ejs");
            return;
        }
    }
    return next();
}

export const getUserWithRoleById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {id},
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

    if (!user) return null;

    // "Làm phẳng" (Flatten) bằng Javascript
    const {role, ...rest} = user;
    return {
        ...rest,
        roleName: role?.name
    };
}

// export const postLogout = async (req: Request, res: Response, next: NextFunction) => {
//     req.logout (function(err) {
//         if (err) {return next(err);}
//         res.redirect("/");
//     });
// }