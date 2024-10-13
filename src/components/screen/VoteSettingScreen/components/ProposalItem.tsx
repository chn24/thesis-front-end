"use client";
import React, { useEffect, useState } from "react";
import { Checkbox, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDebounce from "@/hooks/useDebounce";
import { NewProposal } from "@/utils/type";

interface Props {
  index: number;
  proposal: NewProposal;
  isUpdate: boolean;
  handleProposalChange: (
    index: number,
    content: string,
    isUpdate: boolean
  ) => void;
  handleRemoveProposal: (index: number) => void;
  handleIsImportantProposal: (
    e: React.ChangeEvent<HTMLInputElement>,
    isUpdate: boolean,
    index: number
  ) => void;
  handleChooseProposal: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

export const ProposalItem: React.FC<Props> = ({
  index,
  proposal,
  isUpdate,
  handleProposalChange,
  handleRemoveProposal,
  handleIsImportantProposal,
  handleChooseProposal,
}) => {
  const [content, setContent] = useState<string>(
    proposal ? proposal.content : ""
  );
  const debounceContent = useDebounce(content, 1000);

  useEffect(() => {
    if (typeof debounceContent !== "undefined") {
      handleProposalChange(index, debounceContent ?? "", isUpdate);
    }
  }, [debounceContent]);
  return (
    <div className="w-full flex justify-around items-center px-6 py-4 border-[1px] bg-white rounded-xl">
      <div className="w-[5%] text-left">{index + 1}</div>
      <TextField
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        className="w-[70%]"
      />
      <div className="w-[15%] flex justify-center items-center">
        <Checkbox
          checked={proposal.isImportant}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          onChange={(e) => handleIsImportantProposal(e, isUpdate, index)}
        />
      </div>
      <div className="w-[5%]">
        {isUpdate ? (
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            onChange={(e) => handleChooseProposal(e, index)}
          />
        ) : (
          <IconButton
            className="h-fit"
            onClick={() => {
              handleRemoveProposal(index);
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};
