"use client";
import { getVotingAbi } from "@/abi/votingAbi";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { VoteResultItem } from "./VoteResultItem";
import { Spinner } from "@/components/common/Spinner";
import { AbiCoder } from "ethers/abi";
import { getVotingContract } from "@/const/contract";

interface Props {
  address: string;
}

export type Result = {
  proposalResults: ProposalResult[];
  nominationResults: NominationResult[];
};

export type ProposalResult = {
  percent: number;
  agreeCount: number;
  total: number;
};

export type NominationResult = {
  name: string;
  totalVote: number;
};

type ResultOG = {
  agree: number;
  totalVote: number;
};

type NominationResultOG = {
  index: number;
  content: string;
  totalVote: number;
};

export const VoteResult: React.FC<Props> = ({ address }) => {
  const [results, setResults] = useState<Result>({
    proposalResults: [],
    nominationResults: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetResult = async () => {
    if (!isLoading) {
      setIsLoading(true);
    }
    const contract = await getVotingContract(address);
    const data = await contract.getAllResults();

    const abi = new AbiCoder();
    const newProposalResults: ProposalResult[] = [];
    const newNominationResults: NominationResult[] = [];

    ((data as Array<any>)[0] as Array<ResultOG>).forEach((item) => {
      const total = Number(item.totalVote);

      if (total === 0) {
        const obj: ProposalResult = {
          percent: 0,
          agreeCount: 0,
          total,
        };
        newProposalResults.push(obj);
      } else {
        const agreeCount = Number(item.agree);
        const percent = Number(((agreeCount * 100) / total).toFixed(2));
        const obj: ProposalResult = {
          percent,
          agreeCount,
          total,
        };
        newProposalResults.push(obj);
      }
    });
    ((data as Array<any>)[1] as Array<NominationResultOG>).forEach((item) => {
      const totalVote = Number(item.totalVote);
      const name = abi.decode(["string"], item.content)[0];
      const obj: NominationResult = {
        name,
        totalVote,
      };
      newNominationResults.push(obj);
    });
    newNominationResults
      .sort((result1, result2) => result1.totalVote - result2.totalVote)
      .reverse();
    setResults({
      proposalResults: [...newProposalResults],
      nominationResults: [...newNominationResults],
    });
    setIsLoading(false);
  };

  useEffect(() => {
    void handleGetResult();
  }, []);

  return (
    <div className="p-10 bg-slate-100 shadow-lg rounded-lg flex flex-col gap-5">
      <div className="w-full">
        <p className="text-3xl font-semibold">Kết quả bỏ phiếu đề xuất</p>
        <div className="mx-auto flex flex-col gap-5 mt-5 max-w-[1010px] items-center">
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <Spinner size={32} />
            </div>
          ) : (
            results.proposalResults.map((result, index) => (
              <VoteResultItem key={index} result={result} index={index} />
            ))
          )}
        </div>
      </div>
      <div className="w-full">
        <p className="text-3xl font-semibold">Kết quả bỏ phiếu ứng viên</p>
        <div className="mt-3 w-3/5 mx-auto flex flex-col gap-3">
          <div className="w-full flex justify-around px-6 py-4 border-[1px] border-[#1976d2] rounded-xl">
            <div className="w-3/4 text-left">
              <p>Ứng viên</p>
            </div>
            <div className="w-1/4 text-left">
              <p>Số phiếu bầu</p>
            </div>
          </div>
          {isLoading ? (
            <div className="w-full flex justify-center items-center">
              <Spinner size={32} />
            </div>
          ) : (
            results.nominationResults.map((result) => (
              <div
                key={result.name}
                className="w-full flex px-6 py-3 rounded-xl bg-slate-200"
              >
                <div className="w-3/4 text-left">
                  <p>{result.name}</p>
                </div>
                <div className="w-1/4 text-left">
                  <p>{result.totalVote}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
