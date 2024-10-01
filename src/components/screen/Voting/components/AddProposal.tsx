"use client";
import { getVotingAbi } from "@/abi/votingAbi";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";
import { AddProposalItem } from "./AddProposalItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AbiCoder } from "ethers/abi";
import { toast } from "react-toastify";

interface Props {
  status: number;
  address: string;
}

type NewProposal = {
  content: string;
  isImportant: boolean;
};

export const AddProposal: React.FC<Props> = ({ address, status }) => {
  const [newProposals, setNewProposals] = useState<NewProposal[]>([]);
  const {
    data: hash,
    writeContractAsync,
    isPending,
    isSuccess,
    isError,
    error,
  } = useWriteContract();

  const handleNewProposal = () => {
    setNewProposals((prev) => [...prev, { content: "", isImportant: false }]);
  };

  const handleRemoveProposal = (index: number) => {
    const copiedArr = [...newProposals];

    copiedArr.splice(index, 1);
    setNewProposals([...copiedArr]);
  };

  const handleProposalChange = (index: number, content: string) => {
    const copiedArr = [...newProposals];

    copiedArr[index].content = content;
    setNewProposals([...copiedArr]);
  };

  const handleIsImportantProposal = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const copiedArr = [...newProposals];

    copiedArr[index].isImportant = e.target.checked;
    setNewProposals([...copiedArr]);
  };

  const handleSubmit = async () => {
    try {
      const abi = new AbiCoder();
      const contents: string[] = [];
      const isImportants: boolean[] = [];

      newProposals.forEach((proposal) => {
        const content = abi.encode(["string"], [proposal.content]);
        contents.push(content);
        console.log(content);

        isImportants.push(proposal.isImportant);
      });

      await writeContractAsync({
        abi: getVotingAbi(),
        functionName: "addProposal",
        // @ts-ignore
        address,
        args: [contents, isImportants],
      });
      toast.success("Thêm đề xuất thành công");
    } catch (error) {
      // @ts-ignore
      if (Object.keys(error).includes("cause")) {
        // @ts-ignore
        toast.error(`Thêm thất bại: ${error.cause.reason}`);
      } else {
        toast.error("Thêm thất bại");
      }
    }
  };

  return (
    <div>
      <div className="px-14 py-10 bg-slate-200 rounded-xl min-h-[300px]">
        <div className="flex gap-3">
          <p className="text-3xl font-semibold">Thêm đề xuất</p>
          <IconButton color="success" onClick={handleNewProposal}>
            <AddCircleIcon fontSize="medium" />
          </IconButton>
        </div>

        <div className="mx-auto mt-5 flex flex-col gap-5 justify-around">
          <div className="w-full flex justify-around px-6 py-4 border-[1px] border-[#1976d2] rounded-xl">
            <div className="w-[5%]">#</div>
            <div className="w-[70%] text-left">Đề xuất</div>
            <div className="w-[15%] text-center">Quan trọng</div>
            <div className="w-[5%] text-center"></div>
          </div>
          {newProposals.map((newProposal, index) => (
            <AddProposalItem
              key={index}
              index={index}
              handleProposalChange={handleProposalChange}
              handleRemoveProposal={handleRemoveProposal}
              handleIsImportantProposal={handleIsImportantProposal}
            />
          ))}
        </div>
        <Button onClick={handleSubmit}>Xác nhận</Button>
      </div>
    </div>
  );
};
