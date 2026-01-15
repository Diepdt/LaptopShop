import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string({ message: "Tên sản phẩm không được để trống!" })
        .trim()
        .min(1, { message: "Vui lòng điền tên sản phẩm." }),
    price: z.coerce.number().positive({ message: "Giá tiền phải lớn hơn 0." }),
    detailDesc: z.string().optional(),
    shortDesc: z.string().optional(),
    quantity: z.string()
        .min(1, { message: "Vui lòng điền số lượng sản phẩm." })
        .pipe(z.coerce.number().int().nonnegative({ message: "Số lượng sản phẩm không được âm." })),

    factory: z.string().min(1, { message: "Vui lòng chọn hãng sản xuất" }),
    target: z.string().min(1, { message: "Vui lòng chọn đối tượng sử dụng" })
})