"use client";
import { LoginScreen } from "@/components/screen/LoginScreen";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const setUser = userStore((state) => state.setUser);

  const handleAuth = async () => {
    await fetch("/api/auth")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setUser(data.user);
          router.push("/");
        }
      });
  };

  useEffect(() => {
    void handleAuth();
  }, []);
  return <LoginScreen />;
}
