import React from "react";
import { ListProposal } from "./components/ListProposal";
import { useReadContract, useWriteContract } from "wagmi";
import { getVotingAbi } from "@/abi/votingAbi";
import { Button } from "@mui/material";
import { userStore } from "@/store/userStore";
import { AddProposal } from "../VoteSettingScreen/components/AddProposal";
import { StatusSetting } from "../VoteSettingScreen/components/StatusSetting";
import { VoteResult } from "./components/VoteResult";
import { Delegate } from "./components/Delegate";

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
  const { data: status, refetch } = useReadContract({
    abi: getVotingAbi(),
    // @ts-ignore
    address,
    functionName: "status",
  });
  const user = userStore((state) => state.user);
  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <div className="px-20 py-10 flex flex-col gap-5">
      <Delegate />
      <div className="p-10 bg-slate-100 shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold">Danh sách đề xuất</p>
          {typeof status !== "undefined" && (
            <p
              className="text-lg font-semibold"
              style={{ color: statusInfos[Number(status)].textColor }}
            >
              {statusInfos[Number(status)].text}
            </p>
          )}
        </div>
        <ListProposal address={address} />
      </div>
      <VoteResult address={address} />
    </div>
  );
};
