'use client';

import { InputHTMLAttributes } from "react";
import { Input } from "@/shared/components/ui";
import {
  ClearButton,
  ErrorText,
  RequiredSymbol,
} from "@/shared/components/shared";
import { useFormContext } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = ({
  label,
  name,
  required,
  className,
  ...props
}: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;
  const onClickClear = () => {
    setValue(name, '', {shouldValidate: true})
  }

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-12text-md" {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear}/>}
      </div>
      {errorText ? <ErrorText text={errorText} className="mt-1" /> : <div className="mb-6"></div>}
    </div>
  );
};
