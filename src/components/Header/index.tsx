"use client";
import { getAccountManagerAbi } from "@/abi/accountManagerAbi";
import useOutsideClick from "@/hooks/useOutsideClick";
import { userStore } from "@/store/userStore";
import { formatAddress } from "@/utils/format";
import { Avatar, IconButton } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import Web3 from "web3";

export const Header = () => {
  const pathname = usePathname();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const metamaskConnector = connectors[0];

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = userStore((state) => state.user);
  const {
    data: hash,
    writeContractAsync,
    isError,
    isSuccess,
  } = useWriteContract();

  useOutsideClick([menuRef], () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const handleConnect = () => {
    connect({ connector: metamaskConnector });
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handleClickMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSign = async () => {
    const body = {
      address,
    };
    const response = await fetch("/api/sign", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const signature = data.signature.signature;
    const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_URL);
    const abi = getAccountManagerAbi();
    const contract = new web3.eth.Contract(
      abi,
      process.env.NEXT_PUBLIC_ACCOUNT_MANAGER_ADDRESS
    );

    try {
      await writeContractAsync({
        abi: abi,
        functionName: "verify",
        // @ts-ignore
        address: process.env.NEXT_PUBLIC_ACCOUNT_MANAGER_ADDRESS,
        args: [
          address?.toLowerCase(),
          BigInt(user?.stakeAmount ?? 0),
          signature,
        ],
      });
    } catch (error) {
      console.log(error);
    }
    console.log(isError);

    // await contract.methods
    //   .verify(address, user?.stakeAmount, signature)
    //   .send({ from: address });
    console.log("signature: ", signature);
  };

  return (
    <div
      className={`flex px-10 py-5 justify-between border-b-[1px] border-[#E8E8E8] ${
        pathname === "/login" ? "hidden" : ""
      }`}
    >
      <p>Thesis</p>
      <div className="flex items-center justify-center gap-5">
        {address ? (
          <button
            className="py-1 px-3 w-[145px] bg-[#f2ae3d] group-hover:bg-[#f1ac3b80] border-none rounded-[30px] text-sm text-[#FFE6CD] uppercase  group"
            onClick={handleDisconnect}
          >
            <p className="group-hover:hidden w-max m-auto">
              {formatAddress(address)}
            </p>
            <p className="hidden group-hover:block w-max m-auto text-sm max-sm:text-xs">
              Disconnect
            </p>
          </button>
        ) : (
          <button
            className="py-1 px-3 w-[155px] bg-[#f2ae3d] hover:bg-[#f1ac3b80] border-none rounded-[30px] text-sm max-sm:text-xs text-[#FFE6CD] uppercase "
            onClick={handleConnect}
          >
            Connect wallet
          </button>
        )}
        <div className="relative" ref={menuRef}>
          <IconButton onClick={handleClickMenu}>
            <Avatar className="w-6 h-6" />
          </IconButton>
          {isOpen && (
            <div className="w-max py-4 px-2 absolute right-0 flex flex-col gap-2 bg-slate-200 rounded-xl">
              <div
                className="rounded-lg px-2 py-1 hover:bg-slate-50 cursor-pointer"
                onClick={handleSign}
              >
                Xác thực cổ phần
              </div>
              <div className="rounded-lg px-2 py-1 hover:bg-slate-50 cursor-pointer">
                Đăng xuất
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
