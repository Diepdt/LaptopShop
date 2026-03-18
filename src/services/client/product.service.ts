import { PrismaClient } from "@prisma/client"
import { prisma } from "../../config/client"

export const addProductToCart =  async (quantity: number, id: number, userId: number) => {
    const product = await prisma.product.findUnique({
        where: {id: id}
    });

    const cart = await prisma.cart.findUnique({
        where: {userId: userId}
    });

    if (cart) {
        // update cart
    } else {
        // create cart
        await prisma.cart.create({
            data: {
                userId: userId,
                sum: quantity,
                cartDetails: {
                    create: [
                        {
                            price: product.price,
                            quantity: quantity,
                            productId: product.id
                        }
                    ]
                }
            }
        })
    }
} 