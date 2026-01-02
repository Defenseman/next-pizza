// Пример создания платежа (на прииере YOOKASSA)

import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

type Props = {
    amount: number;
    orderId: number;
    description: string;
}

export const createPayment = async (details: Props) => {
  const data = {
    id: undefined,
    confirmation: {
      confirmation_url: "https://www.google.com"
    }
  }
//   const { data } = await axios.post<PaymentData>(
//     "http://api/yookassa.ru/v3/payments",
//     {
//       amount: {
//         value: details.amount,
//         currency: "RUB",
//       },
//       capture: true,
//       description: details.description,
//       metadata: {
//         oreder_id: details.orderId,
//       },
//       confirmation: {
//         type: "redirect",
//         return_type: process.env.YOOKASSA_CALLBACK_URL,
//       },
//     },
//     {
//       auth: {
//         username: process.env.YOOKASSA_STORE_ID as string,                  // id магазина
//         password: process.env.YOOKASSA_API_KEY as string, 
//       },
//       headers: {
//         "Idempotence-Key": Math.random().toString(36).substring(7),
//       },
//     },
// );

  return data;
};
