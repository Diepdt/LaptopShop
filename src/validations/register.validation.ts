import { prisma } from "../config/client";
import {z} from "zod";

export const checkExitEmail = (email: string) => {
    const res = prisma.user.findUnique({
        where: {username: email}
    })
    if (res == null) return false;
    return true;
}

export const createRegisterSchema = z.object({
    username: z.string().email({message: "Email không hợp lệ."})
        .refine(async (email) => {
            return checkExitEmail(email);
        }, {message: "Email đã tồn tại."}),
    password: z.string()
        .min(3, {message: "Password tối thiểu 3 kí tự."})
        .max(20, {message: "Password tối đa 20 kí tự."}),
    confirmPassword: z.string(),
    fullName: z.string().min(3, {message: "Fullname tối thiểu 3 kí tự."}),
    phone: z.string().min(10, {message: "Số điện thoại phải đủ 10 số."}),
    address: z.string().min(1, {message: "Vui lòng điền địa chỉ."})
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password confirm không chính xác."
});