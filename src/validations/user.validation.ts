import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string()
        .email({message: "Email không hợp lệ"}), // Giả sử username là email
    fullname: z.string().min(2, {message: "Họ tên cần lớn hơn 2 ký tự"}),
    phone: z.string().regex(/^[0-9]{10}$/, {message: "Số điện thoại phải có 10 chữ số"}),
});