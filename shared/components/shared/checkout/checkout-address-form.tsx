"use client";

import { WhiteBlock } from "../white-block";
import { AddressInput } from "../address-input";
import { FormTextarea } from "../form";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";
import { ClearButton } from "../clear-button";

interface Props {
  className?: string;
}

export const CheckoutAddress = ({ className }: Props) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {field.value && <ClearButton />}
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          rows={5}
          className="text-base"
          placeholder="Укажите тут дополнительную информацию для курьера"
        />
      </div>
    </WhiteBlock>
  );
};
