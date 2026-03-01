"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/constants";
import { OrderStatus, Prisma } from "@prisma/client";
import { createPayment, sendEmail } from "@/shared/lib";
import { PayOrderTemplate, VerificationUserTemplate } from "@/shared/components";
import { getUserSession } from "@/shared/lib/get-user-session";
import { hashSync } from 'bcrypt';
import { cookies } from "next/headers";

export const createOrder = async (data: CheckoutFormValues) => {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get("cartToken")?.value;

    if (!cartToken) throw new Error("Cart Token not found");

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });
    if (!userCart) {
      throw new Error("Cart not found!");
    }

    if (userCart.totalAmount === 0) {
      throw new Error("Cart is empty!");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        totalAmount: 1500,
        status: OrderStatus.PENDING,
        items: [],
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({             // Создаем платёжь
      amount: order.totalAmount,
      orderId: order.id,
      description: "Оплата заказа №" + order.id,
    });
    console.log("paymentData:", paymentData);
    
    if (!paymentData) throw new Error("Payment data not found");

    prisma.order.update({                                 // обновляем заказ (добавляем id заказа с YOOKASSA - 
      where: {                                            // чтобы в случае отмены заказа по этому id отменить его)
        id: order.id,
      },
      data: {
        paymentId: paymentData?.id || "0000000000000",
      },
    });

    const paymentUrl = paymentData?.confirmation?.confirmation_url || "https://www.google.com" 

    await sendEmail({
      to: data.email,
      subject: `NEXT PIZZA | Оплатите заказ #${order.id}`,
      template: PayOrderTemplate({
        firstName: data.firstName,
        paymentUrl: paymentUrl,
        orderId: order.id,
        orderItems: userCart?.items,
      }),
    });
    return paymentUrl;

  } catch (error) {
    console.log("Error finding cart:", error);
  }
};


export const updateUserInfo = async (body: Prisma.UserUpdateInput) => {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullname: body.fullname,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : body.password,
      }
    });
  } catch (error) {
    console.error("Error [UPDATE_USER]", error);
    throw error;
  }
}

export const registerUser = async (body: { email: string; password: string; fullname: string }) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтвержденна");
      }
      throw new Error("Пользователь с таким email уже существует");
    }
    const createdUser = await prisma.user.create({
      data: {
        fullname: body.fullname,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        userId: createdUser.id,
        code: verificationCode,
      },
    });

    sendEmail({
      to: body.email,
      subject: "Подтверждение почты | NEXT PIZZA",
      template: VerificationUserTemplate({code: verificationCode})
    });

  } catch (error) {
    console.error("Error [REGISTER_USER]", error);
    throw error;
  }
}