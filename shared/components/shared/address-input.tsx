"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value: string) => void;
  className?: string;
}

export const AddressInput = ({ onChange }: Props) => {
  return (
      <AddressSuggestions
        token="bf779dbef14805b416fdde69b767ed66755ba874" // Из личного кабинета DaData
        onChange={(data) => onChange?.(data?.value)}
      />
  );
};
