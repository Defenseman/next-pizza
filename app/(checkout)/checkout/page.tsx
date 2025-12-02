"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CheckoutAddress,
  CheckoutCart,
  CheckoutUserInfo,
  Container,
  Title,
  CheckoutSidebar,
} from "@/shared/components";
import { CheckoutFormSchema, CheckoutFormValues } from "@/shared/constants";
import { useCart } from "@/shared/hooks";

export default function CheckoutPage() {
  const { items, totalAmount, removeCartItem, updateItemQuantity, loading } =
    useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data);
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "minus" ? quantity - 1 : quantity + 1;
    updateItemQuantity(id, newQuantity);
  };
  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-bold text-[36px] mb-8" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-20">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                items={items}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
                loading={loading}
              />
              <CheckoutUserInfo
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
              <CheckoutAddress
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>

            <div className="w-110">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
