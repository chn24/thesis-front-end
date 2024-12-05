"use client";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProposalItem } from "./ProposalItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AbiCoder } from "ethers/abi";
import { toast } from "react-toastify";
import { NewProposal } from "@/utils/type";
import { getVotingContract } from "@/const/contract";
import { ContractTransactionResponse } from "ethers";

interface Props {
  address: string;
}

export const AddProposal: React.FC<Props> = ({ address }) => {
  const [newProposals, setNewProposals] = useState<NewProposal[]>([]);
  const [proposals, setProposals] = useState<NewProposal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleNewProposal = () => {
    setNewProposals((prev) => [...prev, { content: "", isImportant: false }]);
  };

  const handleRemoveProposal = (index: number) => {
    const copiedArr = [...newProposals];

    copiedArr.splice(index, 1);
    setNewProposals([...copiedArr]);
  };

  const handleProposalChange = (
    index: number,
    content: string,
    isUpdate: boolean
  ) => {
    if (isUpdate) {
      const copiedArr = [...proposals];

      copiedArr[index].content = content;
      setProposals([...copiedArr]);
    } else {
      const copiedArr = [...newProposals];

      copiedArr[index].content = content;
      setNewProposals([...copiedArr]);
    }
  };

  const handleIsImportantProposal = (
    e: React.ChangeEvent<HTMLInputElement>,
    isUpdate: boolean,
    index: number
  ) => {
    if (isUpdate) {
      const copiedArr = [...proposals];

      copiedArr[index].isImportant = e.target.checked;
      setProposals([...copiedArr]);
    } else {
      const copiedArr = [...newProposals];

      copiedArr[index].isImportant = e.target.checked;
      setNewProposals([...copiedArr]);
    }
  };

  const handleChooseProposal = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const copiedArr = [...proposals];

    copiedArr[index].isChosen = e.target.checked;
    setProposals([...copiedArr]);
  };

  const handleSubmit = async () => {
    try {
      const contract = await getVotingContract(address);
      const abi = new AbiCoder();
      const submitProposals: NewProposal[] = [];

      newProposals.forEach((proposal) => {
        const content = abi.encode(["string"], [proposal.content]);
        const obj: NewProposal = {
          content: content,
          isImportant: proposal.isImportant,
        };
        submitProposals.push(obj);
      });

      const tx = (await contract.addProposal(
        submitProposals
      )) as unknown as ContractTransactionResponse;
      await tx.wait();
      toast.success("Thêm đề xuất thành công");
    } catch (error) {
      // @ts-ignore
      if (error.code === 4001) {
        toast.error("Người dùng huỷ giao dịch");
      } else {
        toast.error(
          `Thêm đề xuất thất bại: ${
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
      const submitProposals: NewProposal[] = [];

      proposals.forEach((proposal, index) => {
        if (proposal.isChosen) {
          const content = abi.encode(["string"], [proposal.content]);
          const obj: NewProposal = {
            content,
            isImportant: proposal.isImportant,
          };
          ids.push(index + 1);
          submitProposals.push(obj);
        }
      });

      if (contents.length === 0) {
        return;
      }
      const tx = (await contract.updateProposals(
        submitProposals,
        ids
      )) as unknown as ContractTransactionResponse;
      await tx.wait();
      toast.success("Sửa thành công");
    } catch (error) {
      // @ts-ignore
      if (error.code === 4001) {
        toast.error("Người dùng huỷ giao dịch");
      } else {
        toast.error(
          `Thay đổi đề xuất thất bại: ${
            // @ts-ignore
            error.shortMessage.slice(20)
          }`
        );
      }
    }
  };

  const getProposal = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      const abi = new AbiCoder();
      const votingContract = await getVotingContract(address);
      const listProposal = await votingContract.getAllProposals();

      const mockProposals: NewProposal[] = [];
      listProposal.forEach((item) => {
        const content = abi.decode(["string"], item.content)[0];
        const obj: NewProposal = {
          content,
          isImportant: item.isImportant,
          isChosen: false,
        };
        mockProposals.push(obj);
      });
      setProposals([...mockProposals]);
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    void getProposal();
  }, []);

  return (
    <div className="px-14 py-10 bg-slate-100 rounded-xl">
      <div className="flex gap-3">
        <p className="text-3xl font-semibold">Thêm đề xuất</p>
        <IconButton color="success" onClick={handleNewProposal}>
          <AddCircleIcon fontSize="medium" />
        </IconButton>
      </div>

      <div className="mx-auto mt-5 flex flex-col gap-5 justify-around items-center">
        <div className="w-full flex justify-around px-6 py-4 border-[1px] border-[#1976d2] rounded-xl">
          <div className="w-[5%]">#</div>
          <div className="w-[70%] text-left">Đề xuất</div>
          <div className="w-[15%] text-center">Quan trọng</div>
          <div className="w-[5%] text-center"></div>
        </div>
        {proposals.map((proposal, index) => (
          <ProposalItem
            key={index}
            index={index}
            proposal={proposal}
            isUpdate={true}
            handleProposalChange={handleProposalChange}
            handleRemoveProposal={handleRemoveProposal}
            handleIsImportantProposal={handleIsImportantProposal}
            handleChooseProposal={handleChooseProposal}
          />
        ))}
        {proposals.length > 0 && (
          <div
            className={`w-full flex justify-center ${
              newProposals.length > 0
                ? "pb-4 border-b-[1px] border-[#1976d2]"
                : ""
            }`}
          >
            <Button onClick={handleUpdate}>Sửa</Button>
          </div>
        )}

        {newProposals.map((newProposal, index) => (
          <ProposalItem
            key={index}
            index={index}
            isUpdate={false}
            proposal={newProposal}
            handleProposalChange={handleProposalChange}
            handleRemoveProposal={handleRemoveProposal}
            handleIsImportantProposal={handleIsImportantProposal}
            handleChooseProposal={handleChooseProposal}
          />
        ))}

        {newProposals.length > 0 && (
          <Button onClick={handleSubmit}>Thêm</Button>
        )}
      </div>
    </div>
  );
};
