import React from "react";
import { List } from "./components/List";
import { useReadContract } from "wagmi";
import { getVotingAbi } from "@/abi/votingAbi";
import { VoteResult } from "./components/VoteResult";
import { Delegate } from "./components/Delegate";
import { userStore } from "@/store/userStore";
import Link from "next/link";

interface Props {
  address: string;
}

export type StatusInfo = {
  textColor: string;
  text: string;
  value: number;
  btnColor: "warning" | "primary" | "success";
  btnText: string;
};

export const statusInfos: StatusInfo[] = [
  {
    textColor: "#ff9100",
    text: "Chưa bắt đầu",
    value: 0,
    btnColor: "primary",
    btnText: "",
  },
  {
    textColor: "#ff5555",
    text: "Tạm dừng",
    value: 1,
    btnColor: "warning",
    btnText: "Tạm dừng",
  },
  {
    textColor: "#64dd17",
    text: "Đang bỏ phiếu",
    value: 2,
    btnColor: "primary",
    btnText: "Bắt đầu",
  },
  {
    textColor: "#dd3333",
    text: "Đã đóng",
    value: 3,
    btnColor: "success",
    btnText: "Kết thúc",
  },
];

export const VotingScreen: React.FC<Props> = ({ address }) => {
  const user = userStore((state) => state.user);
  const { data: status } = useReadContract({
    abi: getVotingAbi(),
    // @ts-ignore
    address,
    functionName: "status",
  });

  return (
    <div className="px-20 py-10 flex flex-col gap-5">
      {user?.role === "ADMIN" && (
        <div>
          <Link
            className="text-gray-300 hover:text-[#c5dff9]"
            href={`/vote-setting/${address}`}
          >
            Trang quản lý bầu cử
          </Link>
        </div>
      )}
      <Delegate />
      <List status={status} address={address} />
      <VoteResult address={address} />
    </div>
  );
};
