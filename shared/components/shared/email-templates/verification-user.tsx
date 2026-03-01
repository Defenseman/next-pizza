interface Props {
  code: string;
}

export function VerificationUserTemplate({ code }: Props) {
  return (
    <div>
      <h1>Здравствуйте!</h1>
      <p>
        Ваш код подтверждения: <b>{code}</b>
      </p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </div>
  );
}
