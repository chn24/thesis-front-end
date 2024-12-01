import { getVotingAbi } from "@/abi/votingAbi";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useReadContracts, useWriteContract } from "wagmi";
import { statusInfos } from "../../Voting";
import { toast } from "react-toastify";
import { getVotingContract, provider } from "@/const/contract";
import { ContractTransactionResponse, ethers } from "ethers";
import { Voting } from "@/types/contract/voting";

interface Props {
  address: string;
}

export const StatusSetting: React.FC<Props> = ({ address }) => {
  const { writeContractAsync } = useWriteContract();
  const [amount, setAmount] = useState<number>(0);
  const [info, setInfo] = useState<{
    limit: number;
    status: number;
  }>({
    limit: 0,
    status: 0,
  });
  const { data, refetch } = useReadContracts({
    contracts: [
      {
        // @ts-ignore
        address,
        functionName: "limitNominationVoted",
        abi: getVotingAbi(),
      },
      {
        // @ts-ignore
        address,
        functionName: "status",
        abi: getVotingAbi(),
      },
    ],
  });
  console.log("data: ", data);

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
      await refetch();
    } catch (error) {
      // @ts-ignore
      if (Object.keys(error).includes("cause")) {
        // @ts-ignore
        toast.error(
          `Thay đổi trạng thái thất bại: ${
            // @ts-ignore
            error.cause.details ? error.cause.details : error.cause.reason
          }`
        );
      } else {
        toast.error("Thay đổi trạng thái thất bại");
      }
    }
  };

  const handleSetLimit = async () => {
    try {
      // const contract = await getVotingContract(address);
      // const tx = (await contract.setLimitNominationVoted(
      //   amount
      // )) as unknown as ContractTransactionResponse;
      await writeContractAsync({
        abi: getVotingAbi(),
        functionName: "setLimitNominationVoted",
        // @ts-ignore
        address,
        args: [amount],
      });
      // await tx.wait();
      toast.success("Thay đổi giới hạn thành công");
      await refetch();
    } catch (error) {
      console.log("error: ", error);
      // @ts-ignore
      if (Object.keys(error).includes("cause")) {
        // @ts-ignore
        toast.error(
          `Thay đổi giới hạn thất bại: ${
            // @ts-ignore
            error.cause.details ? error.cause.details : error.cause.reason
          }`
        );
      } else {
        toast.error("Thay đổi giới hạn thất bại");
      }
    }
  };

  // useEffect(() => {
  //   void getInfo();
  // }, []);

  return (
    <div className="px-14 py-10 bg-slate-100 rounded-xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-semibold">Trạng thái</p>
          <p
            className="text-lg font-semibold"
            style={{ color: statusInfos[Number(info.status)].textColor }}
          >
            {statusInfos[data ? (data as Array<any>)[1].result : 0].text}
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

      <div>
        <div>
          <p className="text-3xl font-semibold">
            Số lượng ứng viên được bầu:{" "}
            {data ? (data as Array<any>)[0].result : null}
          </p>
        </div>
        <div className="mt-3 flex gap-5 items-center justify-center">
          <TextField
            type="number"
            variant="standard"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <Button onClick={handleSetLimit}>Xác nhận</Button>
        </div>
      </div>
    </div>
  );
};
