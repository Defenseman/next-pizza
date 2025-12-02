import { CheckoutItem, WhiteBlock } from "..";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { Skeleton } from "../../ui";

interface Props {
    items: CartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem: (id: number) => Promise<void>;
    className?: string;
    loading?: boolean;
}

export const CheckoutCart = ({items, onClickCountButton, removeCartItem, className, loading}: Props) => {
  return (
    <WhiteBlock title="1. Корзина">
      <div className="flex flex-col gap-5">
        {loading 
          ? [...Array(4)].map((_, index) => <Skeleton key={index} className="w-full h-15" />) 
          : items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            details={getCartItemDetails(
              item.pizzaType as PizzaType,
              item.pizzaSize as PizzaSize,
              item.ingredients
            )}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onClickCountButton={(type) =>
              onClickCountButton(item.id, item.quantity, type)
            }
            onClickRemove={() => removeCartItem(item.id)}
            disabled={item.disabled}
          />
        ))}
      </div>
    </WhiteBlock>
  );
};
