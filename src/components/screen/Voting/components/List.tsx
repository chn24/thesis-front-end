"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ProposalRow } from "./ProposalRow";
import { SelectChangeEvent } from "@mui/material";
import { toast } from "react-toastify";
import { Spinner } from "@/components/common/Spinner";
import { statusInfos } from "..";
import { AbiCoder } from "ethers/abi";
import { NominationItem } from "./NominationRow";
import { Answer, Nomination, OPTION, Proposal } from "@/utils/type";
import { getVotingContract } from "@/const/contract";
import { ContractTransactionResponse } from "ethers";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  address: string;
  setReloadResult: Dispatch<SetStateAction<boolean>>;
}
export const List: React.FC<Props> = ({ address, setReloadResult }) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [nominations, setNominations] = useState<{
    limit: number;
    nominations: Nomination[];
  }>({ limit: 0, nominations: [] });
  const [status, setStatus] = useState<number>(0);
  const [chosenNomination, setChosenNomination] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVoting, setIsVoting] = useState<boolean>(false);

  const handleOptionChange = (index: number, e: SelectChangeEvent<OPTION>) => {
    const value = e.target.value;
    const mockProposals: Proposal[] = [...proposals];
    mockProposals[index].option = Number(value);

    setProposals([...mockProposals]);
  };

  const handleAddNomination = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.checked) {
      const arr = [...chosenNomination];
      arr.push(index);

      setChosenNomination([...arr]);
    } else {
      const arr = [...chosenNomination].filter((item) => item !== index);
      setChosenNomination([...arr]);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsVoting(true);
      const answers: Answer[] = [];
      proposals.forEach((proposal) => {
        const answer: Answer = {
          index: proposal.index,
          option: proposal.option,
        };
        answers.push(answer);
      });

      const contract = await getVotingContract(address);
      const tx = (await contract.vote(
        answers,
        chosenNomination
      )) as ContractTransactionResponse;
      await tx.wait();
      setReloadResult(true);
      toast.success("Bỏ phiếu thành công");
    } catch (error) {
      // @ts-ignore
      if (error.code === 4001) {
        toast.error("Người dùng huỷ giao dịch");
      } else {
        toast.error(
          `Bỏ phiếu thất bại: ${
            // @ts-ignore
            error.shortMessage.slice(20)
          }`
        );
      }
    }
    setIsVoting(false);
  };

  const handleGetInfo = async () => {
    try {
      if (!isLoading) {
        setIsLoading(true);
      }

      const abi = new AbiCoder();
      const votingContract = await getVotingContract(address);

      const listProposal = await votingContract.getAllProposals();
      const listNomination = await votingContract.getAllNominations();

      const mockProposals: Proposal[] = [];
      const mockNominations: Nomination[] = [];

      const contractStatus = await votingContract.status();

      listProposal.forEach((item, index) => {
        const content = abi.decode(["string"], item.content)[0];
        const obj: Proposal = {
          content,
          index: index + 1,
          isImportant: item.isImportant,
          option: OPTION.AGREE,
        };
        mockProposals.push(obj);
      });

      listNomination[1].forEach((item) => {
        const content = abi.decode(["string"], item.content)[0];
        const obj: Nomination = {
          index: item.index,
          content,
        };
        mockNominations.push(obj);
      });

      setProposals([...mockProposals]);
      setNominations({
        limit: Number(listNomination[0]),
        nominations: [...mockNominations],
      });
      setStatus(Number(contractStatus));
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    void handleGetInfo();
  }, []);

  return (
    <div className="p-10 bg-slate-100 shadow-lg rounded-lg flex flex-col gap-8">
      <div>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold">Danh sách đề xuất</p>
          {typeof status !== "undefined" && (
            <p
              className="text-lg font-semibold"
              style={{ color: statusInfos[Number(status)].textColor }}
            >
              {statusInfos[Number(status)].text}
            </p>
          )}
        </div>
        <div className="mt-5 w-full max-w-[1010px] flex flex-col justify-center mx-auto gap-3">
          <div className="flex justify-around px-6 py-4 border-[1px] border-[#1976d2] rounded-xl">
            <div className="w-[5%]">#</div>
            <div className="w-[70%] text-left">Đề xuất</div>
            <div className="w-1/4 text-center">Ý kiến</div>
          </div>
          {isLoading && (
            <div className="w-full flex justify-center items-center">
              <Spinner size={32} />
            </div>
          )}
          {proposals.map((proposal, index) => (
            <ProposalRow
              key={proposal.index}
              index={index}
              proposal={proposal}
              handleOptionChange={handleOptionChange}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <p className="text-3xl font-semibold">Danh sách ứng viên</p>
          <p className="text-lg font-semibold">
            Số ứng viên được chọn: {nominations.limit}
          </p>
        </div>

        <div className="mt-5 w-full max-w-[750px] flex flex-col justify-center mx-auto gap-3">
          <div className="flex justify-around px-6 py-4 border-[1px] border-[#1976d2] rounded-xl">
            <div className="w-[10%]">STT</div>
            <div className="w-[70%] text-left">Ứng viên</div>
            <div className="w-1/5 text-center">#</div>
          </div>
          {isLoading && (
            <div className="w-full flex justify-center items-center">
              <Spinner size={32} />
            </div>
          )}
          {nominations.nominations.map((nomination, index) => (
            <NominationItem
              key={nomination.index}
              index={index}
              nomination={nomination}
              handleAddNomination={handleAddNomination}
            />
          ))}
        </div>
      </div>
      <LoadingButton
        loading={isVoting}
        className="mx-auto w-max px-4 py-2 text-white text-sm uppercase bg-[#1976d2] rounded-lg hover:opacity-70 duration-300"
        onClick={handleSubmit}
      >
        Xác nhận
      </LoadingButton>
    </div>
  );
};
