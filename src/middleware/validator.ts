import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        // Thực hiện validate req.body
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            // Lấy danh sách lỗi format lại cho đẹp
            const errorMessages = error.errors.map((issue) => ({
                field: issue.path[0],
                message: issue.message,
            }));

            // Vì bạn dùng EJS (Server Side Rendering), nên không return JSON
            // Mà nên render lại trang tạo mới kèm thông báo lỗi
            // Ví dụ này xử lý chung, nhưng tốt nhất là tùy chỉnh cho từng form

            // Cách đơn giản nhất cho mô hình MVC cũ:
            // Gán lỗi vào biến cục bộ để hiển thị ra view (nếu dùng flash message)
            // Hoặc đơn giản là console.log để debug trước
            console.log("Validation Error:", errorMessages);

            // Tạm thời trả về trang lỗi hoặc render lại trang hiện tại (cần logic phức tạp hơn chút để giữ lại dữ liệu cũ)
            return res.status(400).send(`Lỗi dữ liệu: ${JSON.stringify(errorMessages)}`);
        }
        next(error);
    }
};

export default validate;