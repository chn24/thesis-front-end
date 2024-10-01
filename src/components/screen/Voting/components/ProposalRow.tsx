import React from "react";
import { Proposal } from "./ListProposal";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { OPTION } from "./ListProposal";

interface Props {
  proposal: Proposal;
  index: number;
  handleOptionChange: (index: number, e: SelectChangeEvent<OPTION>) => void;
}

export const ProposalRow: React.FC<Props> = ({
  proposal,
  index,
  handleOptionChange,
}) => {
  return (
    <div className="flex justify-around px-6 py-4 bg-slate-200 rounded-xl">
      <div className="w-[5%]">{proposal.index}</div>
      <div className="w-[70%] text-left">{proposal.content}</div>
      <div className="w-1/4 text-center">
        <Select
          value={proposal.option}
          name="option"
          className="w-[150px] h-10 bg-[#ffffff8b]"
          onChange={(e) => {
            handleOptionChange(index, e);
          }}
        >
          <MenuItem value={OPTION.AGREE}>Đồng ý</MenuItem>
          <MenuItem value={OPTION.IGNORE}>Bác bỏ</MenuItem>
          <MenuItem value={OPTION.NO_COMMENT}>Không ý kiến</MenuItem>
        </Select>
      </div>
    </div>
  );
};
