import { getVotingAbi } from "@/abi/votingAbi";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useWriteContract } from "wagmi";
import { statusInfos } from "..";
import { toast } from "react-toastify";

interface Props {
  status: number;
}

export const StatusSetting: React.FC<Props> = ({ status }) => {
  const {
    data: hash,
    writeContractAsync,
    isPending,
    isSuccess,
    isError,
    error,
  } = useWriteContract();

  const handleSetStatus = async (status: number) => {
    try {
      await writeContractAsync({
        abi: getVotingAbi(),
        functionName: "setStatus",
        // @ts-ignore
        address,
        args: [status],
      });
      toast.success("Thay đổi trạng thái thành công");
    } catch (error) {
      // @ts-ignore
      if (Object.keys(error).includes("cause")) {
        // @ts-ignore
        toast.error(`Thay đổi trạng thái thất bại: ${error.cause.reason}`);
      } else {
        toast.error("Thay đổi trạng thái thất bại");
      }
    }
  };

  return (
    <div className="px-14 py-10 bg-slate-200 rounded-xl flex items-center justify-between">
      <div>
        <p className="text-3xl font-semibold">Trạng thái</p>
        <p
          className="text-lg font-semibold"
          style={{ color: statusInfos[Number(status)].textColor }}
        >
          {statusInfos[status].text}
        </p>
      </div>
      <div className="flex justify-center gap-5">
        {statusInfos.map((statusInfo) => {
          if (statusInfo.value === 0) {
            return null;
          } else {
            return (
              <Button
                key={statusInfo.value}
                variant="contained"
                color={statusInfo.btnColor}
                onClick={() => {
                  handleSetStatus(statusInfo.value);
                }}
              >
                {statusInfo.btnText}
              </Button>
            );
          }
        })}
      </div>
    </div>
  );
};
