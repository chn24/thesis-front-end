"use client";
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { NominationItem } from "./NominationItem";
import { toast } from "react-toastify";
import { AbiCoder } from "ethers/abi";
import { Nomination } from "@/utils/type";
import { getVotingContract } from "@/const/contract";
import { ContractTransactionResponse } from "ethers";

interface Props {
  address: string;
}

export const AddNomination: React.FC<Props> = ({ address }) => {
  const [newNominations, setNewNominations] = useState<string[]>([]);
  const [nominations, setNominations] = useState<Nomination[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleNewNomination = () => {
    setNewNominations((prev) => [...prev, ""]);
  };

  const handleRemoveNomination = (index: number) => {
    const copiedArr = [...newNominations];

    copiedArr.splice(index, 1);
    setNewNominations([...copiedArr]);
  };

  const handleNominationChange = (
    index: number,
    content: string,
    isUpdate: boolean
  ) => {
    if (isUpdate) {
      const copiedArr = [...nominations];

      copiedArr[index].content = content;
      setNominations([...copiedArr]);
    } else {
      const copiedArr = [...newNominations];

      copiedArr[index] = content;
      setNewNominations([...copiedArr]);
    }
  };

  const handleChooseNomination = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const copiedArr: Nomination[] = [...nominations];

    copiedArr[index].isChosen = e.target.checked;

    setNominations([...copiedArr]);
  };

  const handleSubmit = async () => {
    try {
      const contract = await getVotingContract(address);
      const abi = new AbiCoder();
      const contents: string[] = [];

      newNominations.forEach((nomination) => {
        const content = abi.encode(["string"], [nomination]);
        contents.push(content);
      });
      const tx = (await contract.addNomination(
        contents
      )) as ContractTransactionResponse;
      await tx.wait();
      toast.success("Thêm ứng viên thành công");
    } catch (error) {
      // @ts-ignore
      if (error.code === 4001) {
        toast.error("Người dùng huỷ giao dịch");
      } else {
        toast.error(
          `Thêm ứng viên thất bại: ${
            // @ts-ignore
            error.shortMessage.slice(20)
          }`
        );
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const contract = await getVotingContract(address);
      const abi = new AbiCoder();
      const contents: string[] = [];
      const ids: number[] = [];

      nominations.forEach((nomination) => {
        if (nomination.isChosen) {
          const content = abi.encode(["string"], [nomination.content]);
          contents.push(content);
          ids.push(nomination.index);
        }
      });

      const total = await contract.totalNomination();
      console.log("total: ", total);

      console.log("ids: ", ids);

      const tx = (await contract.updateNominations(
        contents,
        ids
      )) as ContractTransactionResponse;
      await tx.wait();
      toast.success("Sửa ứng viên thành công");
    } catch (error) {
      // @ts-ignore
      if (error.code === 4001) {
        toast.error("Người dùng huỷ giao dịch");
      } else {
        toast.error(
          `Thay đổi ứng viên thất bại: ${
            // @ts-ignore
            error.shortMessage.slice(20)
          }`
        );
      }
    }
  };

  const getNomination = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      const abi = new AbiCoder();
      const votingContract = await getVotingContract(address);
      const mockNominations: Nomination[] = [];
      const data = await votingContract.getAllNominations();

      (data[1] as Array<Nomination>).forEach((item) => {
        const content = abi.decode(["string"], item.content)[0];
        const obj: Nomination = {
          content,
          index: item.index,
          isChosen: false,
        };
        mockNominations.push(obj);
      });

      setNominations([...mockNominations]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void getNomination();
  }, []);

  return (
    <div className="px-14 py-10 bg-slate-100 rounded-xl">
      <div className="flex gap-3">
        <p className="text-3xl font-semibold">Ứng viên</p>
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
        {nominations.map((nomination, index) => (
          <NominationItem
            key={nomination.index}
            index={index}
            isUpdate={true}
            nomination={nomination}
            handleChooseNomination={handleChooseNomination}
            handleNominationChange={handleNominationChange}
            handleRemoveNomination={handleRemoveNomination}
          />
        ))}
        {nominations.length > 0 && (
          <div
            className={`w-full max-w-[750px] flex justify-center ${
              newNominations.length > 0
                ? "pb-4 border-b-[1px] border-[#1976d2]"
                : ""
            }`}
          >
            <Button onClick={handleUpdate}>Sửa</Button>
          </div>
        )}
        {newNominations.map((newProposal, index) => (
          <NominationItem
            key={index}
            index={index}
            isUpdate={false}
            handleChooseNomination={handleChooseNomination}
            handleNominationChange={handleNominationChange}
            handleRemoveNomination={handleRemoveNomination}
          />
        ))}
        {newNominations.length > 0 && (
          <Button onClick={handleSubmit}>Xác nhận</Button>
        )}
      </div>
    </div>
  );
};
