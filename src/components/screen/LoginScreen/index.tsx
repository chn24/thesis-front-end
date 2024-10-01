import { LoginForm } from "./components/Form";

export const LoginScreen = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className=" flex flex-col gap-5">
        <p className="text-3xl font-semibold">Đăng nhập</p>

        <LoginForm />
      </div>
    </div>
  );
};
