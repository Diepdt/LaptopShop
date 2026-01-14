import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string().email("Email không hợp lệ"), // Giả sử username là email
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    fullName: z.string().min(2, "Họ tên quá ngắn"),
    phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
    roleId: z.coerce.number().int("Role không hợp lệ"), // Ép kiểu vì select option trả về string
});