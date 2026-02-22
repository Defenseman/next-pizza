import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormRegisterValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormInput, Title } from "@/shared/components";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: () => void;
}

export const LoginForm = ({ onClose }: Props) => {
  const resolver = zodResolver(formLoginSchema);
  const form = useForm<TFormRegisterValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) throw new Error();

      onClose?.();
      
      toast.success("Вы успешно вошли в аккаунт!", { icon: "✅" })
    } catch (error) {
      console.error("Error [LOGIN]", error);
      toast.error("Не удалось войти в аккаунт", { icon: "❌" });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Ведите свою посчту чтобы войти в аккаунт
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="пароль" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Вход
        </Button>
      </form>
    </FormProvider>
  );
};
