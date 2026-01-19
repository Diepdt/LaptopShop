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

export const getProductInfo = async (id: string) => {
    const data = await prisma.product.findUnique({ where: { id: +id } })
    return data;
}

export const updateProductById = async (id: string, name: string, price: string, detailDesc: string, shortDesc: string, quantity: string, sold: string, factory: string, target: string) => {
    await prisma.product.update({
        where: { id: +id }, data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            sold: +sold,
            factory: factory,
            target: target
        }
    })
    console.log(`Update product ${id} successfully!`);
}

export const deleteProductById = async (id: string) => {
    await prisma.product.delete({
        where: {id: +id}
    });
}