"use client";
import { useEffect, useState } from "react";
import { VotingRow } from "./VotingRow";
import { useReadContract } from "wagmi";
import { getVotingManagerAbi } from "@/abi/votingManagerAbi";
import { AbiCoder } from "ethers/abi";
import { votingManagerContract } from "@/const/contract";

export type Voting = {
  contractAddress: string;
  date: number;
  index: number;
  title: string;
};

export const ListVoting = () => {
  const [votings, setVotings] = useState<Voting[]>([]);

  const handleGetData = async () => {
    const data1 = await votingManagerContract.getAllVoting();
    const abi = new AbiCoder();
    const list: Voting[] = [];
    data1.forEach((item) => {
      const title: string = abi.decode(["string"], item.title)[0];
      const obj: Voting = {
        title,
        contractAddress: item.contractAddress,
        date: Number(item.date),
        index: Number(item.index),
      };
      list.push(obj);
    });
    setVotings(list);
  };

  useEffect(() => {
    void handleGetData();
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
