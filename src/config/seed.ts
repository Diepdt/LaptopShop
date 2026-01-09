import { prisma } from "./client";
import { hashPassword } from "../services/user.service";
import { ACCOUNT_TYPE } from "./constant";

const initDatabase = async () => {
    const countRole = await prisma.role.count();
    if (countRole > 0) {
        console.log("Already init role data!");
    } else {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền."
                }, {
                    name: "USER",
                    description: "User thông thường."
                }
            ]
        })
    }

    const countUser = await prisma.user.count();
    if (countUser > 0) {
        console.log("Already init user data!");
    } else {
        const adminRole = await prisma.role.findFirst({ where: { name: "ADMIN" } });
        const userRole = await prisma.role.findFirst({ where: { name: "USER" } });
        await prisma.user.createMany({
            data: [
                {
                    username: "Diepdt",
                    fullName: "Dương Tuấn Điệp",
                    address: "Ngọc Trục - Đại Mỗ - Nam Từ Liêm - Hà Nội",
                    phone: "0867545881",
                    password: await hashPassword("123456"),
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: adminRole?.id
                }, {
                    username: "Datnv",
                    fullName: "Nguyễn Văn Đạt",
                    address: "Trần Phú - Hà Đông - Hà Nội",
                    phone: "086453539",
                    password: await hashPassword("123456"),
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: userRole?.id
                }
            ]
        })
    }

    const countProduct = await prisma.product.count();
    if (countProduct > 0) {
        console.log("Already init product data!");
    } else {
        await prisma.product.createMany({
            data: [
                {
                    name: "MacBook Pro 14 M3",
                    price: 45990000,
                    detailDesc: "Chip Apple M3 Pro mạnh mẽ, RAM 18GB, SSD 512GB. Màn hình Liquid Retina XDR hiển thị siêu sắc nét, pin trâu 18 tiếng.",
                    shortDesc: "Laptop đồ họa chuyên nghiệp, mỏng nhẹ.",
                    quantity: 15,
                    sold: 50000000,
                    factory: "Apple",
                    target: "Designer / Coder"
                },
                {
                    name: "Dell XPS 13 Plus",
                    price: 38500000,
                    detailDesc: "Thiết kế tương lai với bàn phím vô cực, chip Intel Core i7 Gen 13, màn hình OLED cảm ứng. Vỏ nhôm nguyên khối sang trọng.",
                    shortDesc: "Ultrabook cao cấp cho doanh nhân.",
                    quantity: 20,
                    sold: 39000000,
                    factory: "Dell",
                    target: "Doanh nhân"
                },
                {
                    name: "Asus ROG Strix G16",
                    price: 32990000,
                    detailDesc: "Chiến thần Gaming với card RTX 4060 8GB, chip i9-13980HX. Hệ thống tản nhiệt 3 quạt mát rượi, đèn LED RGB cực chất.",
                    shortDesc: "Laptop Gaming hiệu năng khủng.",
                    quantity: 50,
                    sold: 35000000,
                    factory: "Asus",
                    target: "Gaming"
                }
            ]
        })
    }
}

export default initDatabase;