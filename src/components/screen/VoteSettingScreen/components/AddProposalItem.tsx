import React, { useEffect, useState } from "react";
import { Checkbox, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  index: number;
  handleProposalChange: (index: number, content: string) => void;
  handleRemoveProposal: (index: number) => void;
  handleIsImportantProposal: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

export const AddProposalItem: React.FC<Props> = ({
  index,
  handleProposalChange,
  handleRemoveProposal,
  handleIsImportantProposal,
}) => {
  const [content, setContent] = useState<string>("");
  const debounceContent = useDebounce(content, 1000);

  useEffect(() => {
    if (typeof debounceContent !== "undefined") {
      handleProposalChange(index, debounceContent ?? "");
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
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          onChange={(e) => handleIsImportantProposal(e, index)}
        />
      </div>
      <div className="w-[5%]">
        <IconButton
          className="h-fit"
          onClick={() => {
            handleRemoveProposal(index);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
