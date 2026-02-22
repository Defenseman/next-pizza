import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@/shared/components/ui";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({ open, onClose }: Props) => {
  const [type, setType] = useState<'Login' | 'Register'>('Login')

  const switchType = () => {
    setType(type === 'Login' ? 'Register' : 'Login')
  }

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose} >
      <DialogContent className="w-[450px] bg-white p-10">
        <DialogTitle hidden={true} />
        {
          type === 'Login' ? <LoginForm onClose={handleClose}/> : <RegisterForm/>
        }
        <div className="gap-2 flex flex">
          <Button
            variant={"secondary"}
            type="button"
            onClick={() =>
              signIn("github", { callbackUrl: "/", redirect: true })
            }
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="h-6 w-6"
              src={"assets/images/githubIcon.svg"}
              alt="GitHub"
            />
            GitHub
          </Button>
          <Button
            variant={"secondary"}
            type="button"
            onClick={() =>
              signIn("google", { callbackUrl: "/", redirect: true })
            }
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="h-6 w-6"
              src="assets/images/googleIcon.jpg"
              alt="googleIcon"
            />
            Google
          </Button>
        </div>
        <Button onClick={switchType} type="button" variant={"outline"}>
            {type === 'Login' ? 'Регистрация' : 'Войти'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
