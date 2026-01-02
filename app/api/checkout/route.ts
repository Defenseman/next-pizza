import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccess } from "@/shared/components";
import { OrderFail } from "@/shared/components/shared/email-templates/order-fail";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as PaymentCallbackData

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id)
            }
        });

        if (!order) {
            return NextResponse.json({error: "Order not found!"})
        }

        const isSucceeded = body.object.status === 'succeeded';

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
               status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED,
            }
        })

        const items = order?.items as unknown as CartItemDTO[]

        if (isSucceeded) {
            await sendEmail({
                to: order.email,
                subject: `NEXT PIZZA | Заказ оплачен #${order?.id}`,
                template: OrderSuccess({
                    orderId: order.id,
                    orderItems: items,
                }),
            });
        } else {
                await sendEmail({
                to: order.email,
                subject: `NEXT PIZZA | Ошибка при оплате заказа #${order?.id}`,
                template: OrderFail({
                    orderId: order.id,
                    orderItems: items,
                }),
            });
        }

    } catch (error) {
        console.error("[Chechout Callback] Error:", error);
        return NextResponse.json({error: "Server error"})
    }
}