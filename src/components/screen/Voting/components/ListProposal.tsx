"use client";
import React, { useEffect, useState } from "react";
import { ProposalRow } from "./ProposalRow";
import { Button, SelectChangeEvent } from "@mui/material";
import { useWriteContract } from "wagmi";
import { getVotingAbi } from "@/abi/votingAbi";

interface Props {
  address: string;
}

export type Proposal = {
  content: string;
  index: number;
  isImportant: boolean;
  option: OPTION;
};

export type Answer = {
  index: number;
  option: OPTION;
};

export enum OPTION {
  AGREE,
  IGNORE,
  NO_COMMENT,
}
export const ListProposal: React.FC<Props> = ({ address }) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const { data, writeContractAsync } = useWriteContract();

  const getProposals = async () => {
    const response = await fetch(`/api/votings/${address}`);
    const data = await response.json();
    const mockProposals: Proposal[] = [...data.proposals];
    mockProposals.forEach((proposal) => {
      proposal.option = OPTION.AGREE;
    });
    setProposals([...mockProposals]);
  };

  const handleOptionChange = (index: number, e: SelectChangeEvent<OPTION>) => {
    const value = e.target.value;
    const mockProposals: Proposal[] = [...proposals];
    mockProposals[index].option = Number(value);

    setProposals([...mockProposals]);
  };

  const handleSubmit = async () => {
    const answers: Answer[] = [];
    proposals.forEach((proposal) => {
      const answer: Answer = {
        index: proposal.index,
        option: proposal.option,
      };
      answers.push(answer);
    });

    const abi = getVotingAbi();

    await writeContractAsync({
      abi,
      functionName: "vote",
      // @ts-ignore
      address,
      args: [answers],
    });
  };

  useEffect(() => {
    void getProposals();
  }, []);
  return (
    <div className="mt-5 w-full min-[1100px]:w-[1010px] flex flex-col justify-center mx-auto gap-3">
      <div className="flex justify-around px-6 py-4 border-[1px] border-[#1976d2] rounded-xl">
        <div className="w-[5%]">#</div>
        <div className="w-[70%] text-left">Đề xuất</div>
        <div className="w-1/4 text-center">Ý kiến</div>
      </div>
      {proposals.map((proposal, index) => (
        <ProposalRow
          key={proposal.index}
          index={index}
          proposal={proposal}
          handleOptionChange={handleOptionChange}
        />
      ))}
      <Button
        variant="contained"
        className="mx-auto w-maxl"
        onClick={handleSubmit}
      >
        Xác nhận
      </Button>
    </div>
  );
};
