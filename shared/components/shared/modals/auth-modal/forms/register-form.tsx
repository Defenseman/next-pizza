import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/shared/components";

export const RegisterForm = () => {
  const resolver = zodResolver(formRegisterSchema);
  const form = useForm<TFormRegisterValues>({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: TFormRegisterValues) => {
    console.log(data)
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5 " onSubmit={form.handleSubmit(onSubmit)}>
        
      </form>
    </FormProvider>
  );
};
