import Link from "next/link";
import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "../ui";

interface Props {
  onClickSingIn: () => void;
  className?: string;
}

export const ProfileButton = ({ onClickSingIn, className }: Props) => {
  const { data: userData, status } = useSession();
  console.log("STATUS: ", status);
  return (
    <div className={className}>
      {!userData ? (
        <Button
          loading={status === "loading"}
          variant={status === "loading" ? "link" : "outline"}
          onClick={onClickSingIn}
          className="flex items-center gap-1 min-w-30"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <CircleUser size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  );
};
