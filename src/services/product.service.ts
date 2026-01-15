import { prisma } from "../config/client";

export const getAllProducts = async () => {
    const listProducts = await prisma.product.findMany();
    return listProducts;
}

export const handleCreateProduct = async (name: string, price: string, detailDesc: string,
    shortDesc: string, quantity: string, sold: string, factory: string, target: string, productImage: string) => {
    const createProduct = await prisma.product.create({
        data: {
            name: name,
            price: Number.parseInt(price),
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: Number.parseInt(quantity),
            sold: +sold,
            factory: factory,
            target: target,
            ...(productImage && { image: productImage }) // nếu productImage # null thì insert vào database
        }
    });
}