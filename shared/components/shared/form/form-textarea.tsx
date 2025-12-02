"use client"

import { useFormContext } from "react-hook-form";
import { Textarea } from "@/shared/components/ui/textarea";
import { ClearButton } from "../clear-button";

interface Props {
    className?: string;
    name: string;
    label?: string;
    required?: boolean;
}

export const FormTextarea = ({name, required, label, className, ...props}: Props) => {
  const {
    register,
    formState: { errors },
    watch, 
    setValue,
  } = useFormContext()

  const text = watch(name)
  const errorText = errors?.[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '');
  }

    return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />
          {text && (
            <ClearButton onClick={onClickClear} />
          )}
      </div>

      {errorText && <p className="text-sm text-red-500 mt-2">{errorText}</p>}
    </div>
  )
}