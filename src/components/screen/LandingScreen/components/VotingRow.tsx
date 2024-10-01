import React from "react";
import { Voting } from "./ListVoting";
import { formatAddress } from "@/utils/format";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  voting: Voting;
}

export const VotingRow: React.FC<Props> = ({ voting }) => {
  return (
    <div className="flex justify-around px-6 py-4 bg-slate-200 rounded-xl">
      <div className="w-[5%]">{voting.index}</div>
      <div className="w-1/2 text-center">{voting.title}</div>
      <div className="w-1/4 text-center">
        <Link
          className="hover:text-[#c7a079]"
          href={`/voting/${voting.contractAddress}`}
        >
          {formatAddress(voting.contractAddress)}
        </Link>
      </div>
      <div className="w-1/5 text-center">
        {dayjs(voting.date).format("DD/MM/YYYY")}
      </div>
    </div>
  );
};
