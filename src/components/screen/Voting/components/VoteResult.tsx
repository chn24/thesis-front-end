"use client";
import { getVotingAbi } from "@/abi/votingAbi";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { VoteResultItem } from "./VoteResultItem";
import { Spinner } from "@/components/common/Spinner";

interface Props {
  address: string;
}

export type Result = {
  percent: number;
  agreeCount: number;
  total: number;
};

type ResultOG = {
  agree: number;
  ignore: number;
  noComment: number;
};

export const VoteResult: React.FC<Props> = ({ address }) => {
  const [results, setResults] = useState<Result[]>([]);
  const { data, isPending } = useReadContract({
    abi: getVotingAbi(),
    // @ts-ignore
    address,
    functionName: "getAllResults",
  });

  useEffect(() => {
    if (!isPending && data) {
      const newResults: Result[] = [];
      ((data as Array<any>)[0] as Array<ResultOG>).forEach((item) => {
        const total = Number(item.agree + item.ignore + item.noComment);

        if (total === 0) {
          const obj: Result = {
            percent: 0,
            agreeCount: 0,
            total,
          };
          newResults.push(obj);
        } else {
          const agreeCount = Number(item.agree);
          const percent = Number(((agreeCount * 100) / total).toFixed(2));
          const obj: Result = {
            percent,
            agreeCount,
            total,
          };
          newResults.push(obj);
        }
      });
      setResults([...newResults]);
    }
  }, [isPending]);

  return (
    <div className="p-10 bg-slate-100 shadow-lg rounded-lg">
      <p className="text-3xl font-semibold">Kết quả</p>
      <div className="mx-auto flex flex-col gap-5 mt-5 max-w-[1010px] items-center">
        {isPending && (
          <div className="w-full flex justify-center items-center">
            <Spinner size={32} />
          </div>
        )}
        {results.map((result, index) => (
          <VoteResultItem key={index} result={result} index={index} />
        ))}
      </div>
    </div>
  );
};
