import { getVotingAbi } from "@/abi/votingAbi";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";
import { statusInfos } from "../../Voting";
import { toast } from "react-toastify";
import { getVotingContract } from "@/const/contract";
import { ContractTransactionResponse } from "ethers";
import LoadingButton from "@mui/lab/LoadingButton";

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
  const [isLoading, setIsLoading] = useState<{
    limit: boolean;
    status: boolean;
  }>({
    limit: false,
    status: false,
  });

  const getInfo = async () => {
    const contract = await getVotingContract(address);
    const limit = await contract.limitNominationVoted();
    const status = await contract.status();

    setInfo((prev) => ({
      ...prev,
      status: Number(status),
      limit: Number(limit),
    }));
  };

  const handleSetStatus = async (status: number) => {
    try {
      setIsLoading((prev) => ({
        ...prev,
        status: true,
      }));
      const contract = await getVotingContract(address);
      const tx = (await contract.setStatus(
        status
      )) as unknown as ContractTransactionResponse;
      await tx.wait();
      toast.success("Thay đổi trạng thái thành công");

      setIsLoading((prev) => ({
        ...prev,
        status: false,
      }));
      await getInfo();
    } catch (error) {
      // @ts-ignore
      if (error.code === 4001) {
        toast.error("Người dùng huỷ giao dịch");
      } else {
        toast.error(
          `Thay đổi giới hạn thất bại: ${
            // @ts-ignore
            error.shortMessage.slice(20)
          }`
        );
      }
      setIsLoading((prev) => ({
        ...prev,
        status: false,
      }));
    }
  };

  const handleSetLimit = async () => {
    try {
      setIsLoading((prev) => ({
        ...prev,
        limit: true,
      }));
      const contract = await getVotingContract(address);
      const tx = (await contract.setLimitNominationVoted(
        amount
      )) as unknown as ContractTransactionResponse;
      await tx.wait();
      toast.success("Thay đổi giới hạn thành công");
      setIsLoading((prev) => ({
        ...prev,
        limit: false,
      }));
      await getInfo();
    } catch (error) {
      // @ts-ignore
      if (error.code === 4001) {
        toast.error("Người dùng huỷ giao dịch");
      } else {
        toast.error(
          `Thay đổi giới hạn thất bại: ${
            // @ts-ignore
            error.shortMessage.slice(20)
          }`
        );
      }
      setIsLoading((prev) => ({
        ...prev,
        limit: false,
      }));
    }
  };

  useEffect(() => {
    void getInfo();
  }, []);

  return (
    <div className="px-14 py-10 bg-slate-100 rounded-xl flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-semibold">Trạng thái</p>
          <p
            className="text-lg font-semibold"
            style={{ color: statusInfos[Number(info.status)].textColor }}
          >
            {statusInfos[info.status].text}
          </p>
        </div>
        <div className="flex justify-center gap-5">
          {statusInfos.map((statusInfo) => {
            if (statusInfo.value === 0) {
              return null;
            } else {
              return (
                <LoadingButton
                  loading={isLoading.status}
                  key={statusInfo.value}
                  variant="contained"
                  color={statusInfo.btnColor}
                  onClick={() => {
                    handleSetStatus(statusInfo.value);
                  }}
                >
                  {statusInfo.btnText}
                </LoadingButton>
              );
            }
          })}
        </div>
      </div>

      <div>
        <div>
          <p className="text-3xl font-semibold">
            Số lượng ứng viên được bầu:
            {info.limit}
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
          <LoadingButton loading={isLoading.limit} onClick={handleSetLimit}>
            Xác nhận
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};
