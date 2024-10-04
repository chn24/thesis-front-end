"use client";
import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AddNominationItem } from "./AddNominationItem";
import { toast } from "react-toastify";
import { AbiCoder } from "ethers/abi";
import { useWriteContract } from "wagmi";
import { getVotingAbi } from "@/abi/votingAbi";

interface Props {
  address: string;
}

export const AddNomination: React.FC<Props> = ({ address }) => {
  const [newNominations, setNewNominations] = useState<string[]>([]);
  const { writeContractAsync } = useWriteContract();

  const handleNewNomination = () => {
    setNewNominations((prev) => [...prev, ""]);
  };

  const handleRemoveNomination = (index: number) => {
    const copiedArr = [...newNominations];

    copiedArr.splice(index, 1);
    setNewNominations([...copiedArr]);
  };

  const handleNominationChange = (index: number, content: string) => {
    const copiedArr = [...newNominations];

    copiedArr[index] = content;
    setNewNominations([...copiedArr]);
  };

  const handleSubmit = async () => {
    try {
      const abi = new AbiCoder();
      const contents: string[] = [];

      newNominations.forEach((nomination) => {
        const content = abi.encode(["string"], [nomination]);
        contents.push(content);
      });

      await writeContractAsync({
        abi: getVotingAbi(),
        functionName: "addNomination",
        // @ts-ignore
        address,
        args: [contents],
      });
      toast.success("Thêm ứng viên thành công");
    } catch (error) {
      // @ts-ignore
      if (Object.keys(error).includes("cause")) {
        // @ts-ignore
        toast.error(
          `Thêm ứng viên thất bại: ${
            // @ts-ignore
            error.cause.details ? error.cause.details : error.cause.reason
          }`
        );
      } else {
        toast.error("Thêm ứng viên thất bại");
      }
    }
  };

  return (
    <div className="px-14 py-10 bg-slate-100 rounded-xl min-h-[300px]">
      <div className="flex gap-3">
        <p className="text-3xl font-semibold">Thêm ứng viên</p>
        <IconButton color="success" onClick={handleNewNomination}>
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </div>

      <div className="mx-auto mt-5 flex flex-col gap-5 justify-around items-center">
        <div className="w-full max-w-[750px] flex justify-around px-6 py-4 border-[1px] border-[#1976d2] rounded-xl">
          <div className="w-[5%]">#</div>
          <div className="w-[70%] text-left">Ứng viên</div>
          <div className="w-[5%] text-center"></div>
        </div>
        {newNominations.map((newProposal, index) => (
          <AddNominationItem
            key={index}
            index={index}
            handleNominationChange={handleNominationChange}
            handleRemoveNomination={handleRemoveNomination}
          />
        ))}
        <Button onClick={handleSubmit}>Xác nhận</Button>
      </div>
    </div>
  );
};
