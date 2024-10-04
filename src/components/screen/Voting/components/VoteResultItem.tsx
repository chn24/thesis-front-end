import React from "react";
import { Result } from "./VoteResult";

interface Props {
  result: Result;
  index: number;
}

export const VoteResultItem: React.FC<Props> = ({ result, index }) => {
  return (
    <div className="w-full flex gap-5 items-center">
      <p className="text-lg font-medium">{index + 1}</p>
      <div className="transition-all duration-500 group relative w-full rounded-2xl h-[26px] bg-slate-200 cursor-pointer ease-in-out">
        <div className="h-[26px] leading-[26px] transition-all duration-500 absolute m-auto left-0 right-0 text-center text-[#ffffff00] group-hover:text-white ease-in-out">
          {result.percent}%
        </div>
        <div
          //   className="rounded-xl h-[26px] transition-all duration-500 bg-gradient-to-tl to-white via-black from-red-500 bg-size-200 bg-pos-0 group-hover:bg-pos-100"
          className="transition-all duration-500 h-[26px] bg-gradient-to-r from-[#0ECB81] via-[#92ffd4] to-[#0ECB81] bg-size-200 bg-pos-0 group-hover:bg-pos-100 rounded-2xl"
          style={{
            width: `${result.percent}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
