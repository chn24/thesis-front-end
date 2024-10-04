"use client";
import { useEffect, useState } from "react";
import { VotingRow } from "./VotingRow";

export type Voting = {
  contractAddress: string;
  createdAt: Date;
  date: Date;
  index: number;
  title: string;
};

export const ListVoting = () => {
  const [votings, setVotings] = useState<Voting[]>([]);
  const getVotings = async () => {
    const response = await fetch("/api/votings");
    const data = await response.json();
    setVotings(data.votings);
  };
  useEffect(() => {
    void getVotings();
  }, []);
  return (
    <div className="p-10 bg-slate-100 shadow-lg rounded-lg">
      <p className="text-3xl font-semibold">Danh sách bỏ phiếu</p>
      <div className="mt-5 w-full max-w-[1010px] flex flex-col justify-center mx-auto gap-3 bg-slate-50">
        <div className="flex justify-around px-6 py-4 border-[1px] border-[#1976d2] rounded-xl">
          <div className="w-[5%]">#</div>
          <div className="w-1/2 text-center">Tiêu đề</div>
          <div className="w-1/4 text-center">Địa chỉ contract</div>
          <div className="w-1/5 text-center">Ngày họp</div>
        </div>
        {votings.map((voting) => (
          <VotingRow key={voting.contractAddress} voting={voting} />
        ))}
      </div>
    </div>
  );
};
