"use client";
import React, { useEffect, useState } from "react";
import { ListVoting } from "./components/ListVoting";
import { AddVoting } from "./components/AddVoting";
import { userStore } from "@/store/userStore";
import { votingManagerContract } from "@/const/contract";
import { AbiCoder } from "ethers/abi";

export type Voting = {
  contractAddress: string;
  date: number;
  index: number;
  title: string;
};

export const LandingScreen = () => {
  const user = userStore((state) => state.user);
  const [votings, setVotings] = useState<Voting[]>([]);

  const handleGetData = async () => {
    const data1 = await votingManagerContract.getAllVoting();
    const abi = new AbiCoder();
    const list: Voting[] = [];
    data1.forEach((item) => {
      const title: string = abi.decode(["string"], item.title)[0];
      const obj: Voting = {
        title,
        contractAddress: item.contractAddress,
        date: Number(item.date),
        index: Number(item.index),
      };
      list.push(obj);
    });
    setVotings(list);
  };

  useEffect(() => {
    void handleGetData();
  }, []);

  return (
    <div className="px-20 pt-10 flex flex-col gap-10">
      {user?.role === "ADMIN" && <AddVoting handleGetData={handleGetData} />}
      <ListVoting votings={votings} />
    </div>
  );
};
