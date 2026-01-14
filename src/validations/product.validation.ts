import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string({ required_error: "Tên sản phẩm không được để trống!" }),
    price: z.coerce.number().positive("Giá tiền phải lớn hơn 0."),
    quantity: z.coerce.number().int().nonnegative("Số lượng sản phẩm không được âm."),
    detailDesc: z.string().optional(),
    shortDesc: z.string().optional(),
    factory: z.string().min(1, "Vui lòng chọn hãng sản xuất"),
    target: z.string().min(1, "Vui lòng chọn đối tượng sử dụng")
})