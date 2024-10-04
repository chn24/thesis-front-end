"use client";
import React, { useEffect } from "react";
import { ListVoting } from "./components/ListVoting";
import { AddVoting } from "./components/AddVoting";
import { userStore } from "@/store/userStore";

export const LandingScreen = () => {
  const user = userStore((state) => state.user);
  
  return (
    <div className="px-20 pt-10 flex flex-col gap-10">
      {user?.role === "ADMIN" && <AddVoting />}
      <ListVoting />
    </div>
  );
};
