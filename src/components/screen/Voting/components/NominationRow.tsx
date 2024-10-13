import React from "react";
import { Checkbox } from "@mui/material";
import { Nomination } from "@/utils/type";

interface Props {
  nomination: Nomination;
  index: number;
  handleAddNomination: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

export const NominationItem: React.FC<Props> = ({
  nomination,
  index,
  handleAddNomination,
}) => {
  return (
    <div className="flex justify-around items-center px-6 py-4 bg-slate-200 rounded-xl">
      <div className="w-[10%]">{index + 1}</div>
      <div className="w-[70%] text-left">{nomination.content}</div>
      <div className="w-1/5 text-center">
        <Checkbox
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          onChange={(e) => handleAddNomination(e, nomination.index)}
        />
      </div>
    </div>
  );
};
