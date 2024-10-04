"use client";
import { getAccountManagerAbi } from "@/abi/accountManagerAbi";
import useOutsideClick from "@/hooks/useOutsideClick";
import { userStore } from "@/store/userStore";
import { formatAddress } from "@/utils/format";
import { Avatar, IconButton } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import Web3 from "web3";
import { Spinner } from "../common/Spinner";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const metamaskConnector = connectors[0];

  const [isSigning, setIsSigning] = useState<boolean>(false);
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
    if (!isSigning) {
      setIsSigning(true);
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
          args: [BigInt(user?.stakeAmount ?? 0), signature],
        });
        toast.success("Xác thực thành công");
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
          toast.error("Thêm thất bại");
        }
      }
      setIsSigning(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          router.push("/login");
        } else {
          toast.error("Đăng xuất thất bại");
        }
      })
      .catch((error) => {
        toast.error("Đăng xuất thất bại");
      });
  };

  return (
    <div
      className={`flex px-10 py-5 justify-between border-b-[1px] border-[#E8E8E8] ${
        pathname === "/login" ? "hidden" : ""
      }`}
    >
      <Link href="/" className="text-xl font-semibold">
        Thesis
      </Link>
      <div className="flex items-center justify-center gap-5">
        {address ? (
          <div
            className="cursor-pointer py-1 px-3 w-[145px] bg-[#1976d2] group-hover:bg-[#518eca] border-none rounded-[30px] text-sm text-[#c5dff9] uppercase  group"
            onClick={handleDisconnect}
          >
            <p className="group-hover:hidden w-max m-auto">
              {formatAddress(address)}
            </p>
            <p className="hidden group-hover:block w-max m-auto text-sm max-sm:text-xs">
              Disconnect
            </p>
          </div>
        ) : (
          <div
            className="cursor-pointer py-1 px-3 w-[155px] bg-[#1976d2] hover:bg-[#518eca] border-none rounded-[30px] text-sm max-sm:text-xs text-[#c5dff9] uppercase "
            onClick={handleConnect}
          >
            Connect wallet
          </div>
        )}
        <div className="relative" ref={menuRef}>
          <IconButton onClick={handleClickMenu}>
            <Avatar className="w-6 h-6" />
          </IconButton>
          {isOpen && (
            <div className="w-[185px] py-4 px-2 absolute right-0 flex flex-col gap-2 bg-slate-200 rounded-xl shadow-lg">
              <div
                className="rounded-lg px-2 py-1 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                onClick={handleSign}
              >
                {isSigning && <Spinner size={16} />}
                Xác thực cổ phần
              </div>
              <button
                className="rounded-lg px-2 py-1 hover:bg-slate-50 cursor-pointer text-left"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
