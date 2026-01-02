interface Props {
  orderId: number;
  orderItems: any[];
}

export function OrderSuccess({ orderId, orderItems }: Props) {
  return (
    <div>
      <h1> Спасибо за заказ!</h1>
      <p>
        Ваш заказ <b>#{orderId}</b> успешно оплачен.
      </p>
      <p>
        P.S. С нетерпением ждём вас снова ваша <b>NEXT/PIZZA</b>
      </p>
      <div className="mt-4">
        <p className="font-semibold">Содержимое заказа:</p>

        {orderItems.map((item) => (
          <table
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            border="0"
            style={{ marginTop: "10px" }}
          >
            <tr>
              <td width="80" valign="top">
                <img
                  src={item.productItem.product.imageUrl}
                  width="80"
                  height="80"
                  style={{
                    display: "block",
                    borderRadius: "4px",
                    paddingTop: "20px",
                  }}
                />
              </td>

              <td valign="top" style={{ paddingLeft: "10px" }}>
                <p>
                  Пицца: <b>{item.productItem.product.name}</b>
                </p>
                <p>
                  Количество: <b>{item.quantity}</b>
                </p>
                <p>
                  Цена: <b>{item.productItem.price}</b> ₽
                </p>
              </td>
            </tr>
          </table>
        ))}
      </div>
    </div>
  );
}
