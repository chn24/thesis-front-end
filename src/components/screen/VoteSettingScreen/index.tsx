import { getVotingAbi } from "@/abi/votingAbi";
import React from "react";
import { useReadContract } from "wagmi";
import { StatusSetting } from "./components/StatusSetting";
import { AddProposal } from "./components/AddProposal";
import { AddNomination } from "./components/AddNomination";

interface Props {
  address: string;
}

export const VoteSettingScreen: React.FC<Props> = ({ address }) => {
  const { data: status, refetch } = useReadContract({
    abi: getVotingAbi(),
    // @ts-ignore
    address,
    functionName: "status",
  });
  const handleRefetch = async () => {
    await refetch();
  };
  return (
    <div className="px-20 py-10 flex flex-col gap-5">
      <StatusSetting
        address={address}
        status={Number(status ?? 0)}
        refetch={handleRefetch}
      />
      <AddProposal address={address} />
      <AddNomination address={address} />
    </div>
  );
};
