// "use client";

import React from "react";
import { CheckoutItemDetails, WhiteBlock } from "@/shared/components/shared";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  className?: string;
  loading?: boolean;
}

export const CheckoutSidebar = ({ totalAmount, loading, className }: Props) => {
  // const [redirecting, setRedirecting] = useState(false);
  const vatPrice = (totalAmount * VAT) / 100;
  const totalOrderPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итог:</span>
        {
          loading 
          ? <Skeleton className="h-10 mb-3 w-48"/>
          : <span className="text-[34px] font-extrabold">{totalOrderPrice} ₽</span>
        }
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={20} className="mr-2 text-gray-300" />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16"/> : `${totalAmount}₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={20} className="mr-2 text-gray-300" />
            Налоги:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16"/> : `${vatPrice} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={20} className="mr-2 text-gray-300" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16"/> : `${DELIVERY_PRICE} ₽`}
      />
      <Button
        // onClick={() => setRedirecting(true)}
        // loading={redirecting}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
