import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormInput, Title } from "@/shared/components";
import toast from "react-hot-toast";
import { registerUser } from "@/app/actions";

interface Props {
  onClose?: () => void;
}

export const RegisterForm = ({onClose}: Props) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit =  async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullname: data.fullName,
        password: data.password,
      })
      toast.success("Вы успешно зарегестрировались!", { icon: "✅" })
      onClose?.()
    } catch (error) {
      toast.error("Не удалось зарегестрироваться", { icon: "❌" });
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1 w-96 mt-10">
          <FormInput label="Имя и фамилия" name="fullName" required />
          <FormInput label="Email" name="email" type="email" required />
          
          <FormInput label="Пароль" name="password" type="password" required/>
          <FormInput label="Подтвердите пароль" name="confirmPassword" type="password" required />

          <Button type="submit" loading={form.formState.isSubmitting} className="text-base mt-10 h-12">
              Зарегестрироваться
          </Button>
      </form>
    </FormProvider>
  );
};
