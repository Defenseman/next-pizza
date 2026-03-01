'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./modals/auth-modal/forms/schemas";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form/";
import { Button } from "../ui";
import { updateUserInfo } from "@/app/actions";

interface ProfileFormProps {
    data: User;
}

export const ProfileForm = ({ data }: ProfileFormProps) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: data.fullname,
            email: data.email,
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                fullname: values.fullName,
                email: values.email,
                password: values.password,
            })

            toast.success("Данные успешно обновлен", {
                icon: "✅",
            });
        } catch (error) {
            toast.error("Ошибка при обновлении данных", {
                icon: "❌",
            });
        }
    }

    const onClickSignOut = () => {
        signOut({ callbackUrl: "/" })
    }

    return (
        <Container className="my-10">
            <Title text={`Личные данные | #${data.id}`} size="md" className="font-bold" />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1 w-96 mt-10">
                    <FormInput label="Имя и фамилия" name="fullName" />
                    <FormInput label="Email" name="email" type="email" />
                    
                    <FormInput label="Пароль" name="password" type="password" />
                    <FormInput label="Подтвердите пароль" name="confirmPassword" type="password" />

                    <Button type="submit" disabled={form.formState.isSubmitting} className="text-base mt-10">
                        Сохранить
                    </Button>
                    <Button 
                        onClick={onClickSignOut} 
                        className=" text-base"
                        type="button" 
                        variant="secondary"
                    >
                        Выйти
                    </Button>
                </form>
            </FormProvider>
        </Container>
    )
}