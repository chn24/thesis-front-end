"use client";
import React, { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  index: number;
  handleNominationChange: (index: number, content: string) => void;
  handleRemoveNomination: (index: number) => void;
}
export const AddNominationItem: React.FC<Props> = ({
  index,
  handleNominationChange,
  handleRemoveNomination,
}) => {
  const [content, setContent] = useState<string>("");
  const debounceContent = useDebounce(content, 1000);

  useEffect(() => {
    if (typeof debounceContent !== "undefined") {
      handleNominationChange(index, debounceContent ?? "");
    }
  }, [debounceContent]);
  return (
    <div className="w-full max-w-[750px] flex justify-around items-center px-6 py-4 border-[1px] bg-white rounded-xl">
      <div className="w-[5%] text-left">{index + 1}</div>
      <TextField
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        className="w-[70%]"
      />
      <div className="w-[5%]">
        <IconButton
          className="h-fit"
          onClick={() => {
            handleRemoveNomination(index);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
