import React from "react";
import { StatusSetting } from "./components/StatusSetting";
import { AddProposal } from "./components/AddProposal";
import { AddNomination } from "./components/AddNomination";

interface Props {
  address: string;
}

export const VoteSettingScreen: React.FC<Props> = ({ address }) => {
  return (
    <div className="px-20 py-10 flex flex-col gap-5">
      <StatusSetting address={address} />
      <AddProposal address={address} />
      <AddNomination address={address} />
    </div>
  );
};
