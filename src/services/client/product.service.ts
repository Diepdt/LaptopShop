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
        await prisma.cart.update({
            where: {id: cart.id},
            data: {
                sum: {
                    increment: quantity, // tăng theo quantity
                },
            }
        })
        // update cart detail
        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                cartId: cart.id,
                productId: product.id
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0 // nếu chưa tồn tại currentCartDetail -> id = 0 thì chạy ra hàm create
            },
            update: {
                quantity: {increment: quantity}
            },
            create: {
                quantity: quantity,
                price: product.price,
                cartId: cart.id,
                productId: product.id
            }
        })
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