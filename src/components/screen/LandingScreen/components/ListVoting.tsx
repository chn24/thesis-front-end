"use client";
import { useEffect, useState } from "react";
import { VotingRow } from "./VotingRow";
import { useReadContract } from "wagmi";
import { getVotingManagerAbi } from "@/abi/votingManagerAbi";
import { AbiCoder } from "ethers/abi";

export type Voting = {
  contractAddress: string;
  date: number;
  index: number;
  title: string;
};

export const ListVoting = () => {
  const { data, isPending, refetch } = useReadContract({
    abi: getVotingManagerAbi(),
    // @ts-ignore
    address: process.env.NEXT_PUBLIC_VOTING_MANAGER_ADDRESS,
    functionName: "getAllVoting",
  });

  const [votings, setVotings] = useState<Voting[]>([]);
  const handleParseListVoting = () => {
    const abi = new AbiCoder();
    const list: Voting[] = [];
    (data as Array<Voting>).forEach((item) => {
      const title: string = abi.decode(["string"], item.title)[0];
      const obj: Voting = {
        title,
        contractAddress: item.contractAddress,
        date: item.date,
        index: item.index,
      };
      list.push(obj);
    });

    setVotings(list);
  };
  useEffect(() => {
    if (!isPending) {
      handleParseListVoting();
    }
  }, [isPending]);

  useEffect(() => {
    if (data) {
      handleParseListVoting();
    }
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
