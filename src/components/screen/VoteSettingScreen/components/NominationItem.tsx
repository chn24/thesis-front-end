"use client";
import React, { useEffect, useState } from "react";
import { Checkbox, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDebounce from "@/hooks/useDebounce";
import { Nomination } from "@/utils/type";

interface Props {
  index: number;
  nomination?: Nomination;
  isUpdate: boolean;
  handleChooseNomination: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleNominationChange: (
    index: number,
    content: string,
    isUpdate: boolean
  ) => void;
  handleRemoveNomination: (index: number) => void;
}
export const NominationItem: React.FC<Props> = ({
  index,
  nomination,
  isUpdate,
  handleChooseNomination,
  handleNominationChange,
  handleRemoveNomination,
}) => {
  const [content, setContent] = useState<string>(
    nomination ? nomination.content : ""
  );
  const debounceContent = useDebounce(content, 1000);

  useEffect(() => {
    if (typeof debounceContent !== "undefined") {
      handleNominationChange(index, debounceContent ?? "", isUpdate);
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
        {isUpdate ? (
          <Checkbox
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            onChange={(e) => handleChooseNomination(index, e)}
          />
        ) : (
          <IconButton
            className="h-fit"
            onClick={() => {
              handleRemoveNomination(index);
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};
