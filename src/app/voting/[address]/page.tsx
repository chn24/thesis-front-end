"use client";
// import { VotingScreen } from "@/components/screen/Voting";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const VotingScreen = dynamic<{ address: string }>(() =>
  import("../../../components/screen/Voting").then((mod) => mod.VotingScreen)
);

export default function VotingPage({
  params,
}: {
  params: { address: string };
}) {
  const router = useRouter();
  const setUser = userStore((state) => state.setUser);

  const handleAuth = async () => {
    await fetch("/api/auth")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 401) {
          router.push("/login");
        } else if (response.status === 404) {
          toast.warn("Không tìm thấy tài khoản");
          router.push("/login");
        }
      })
      .then((data: any) => {
        if (data) {
          setUser(data.user);
        }
      });
  };

  useEffect(() => {
    void handleAuth();
  }, []);
  return <VotingScreen address={params.address} />;
}
