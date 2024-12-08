import { getAccountManagerAbi } from "@/abi/accountManagerAbi";
import { getVotingAbi } from "@/abi/votingAbi";
import { getVotingManagerAbi } from "@/abi/votingManagerAbi";
import { AccountManager } from "@/types/contract/AccountManager";
import { Voting } from "@/types/contract/voting";
import { VotingManager } from "@/types/contract/votingManager";
import { BrowserProvider, ethers } from "ethers";

if (!process.env.NEXT_PUBLIC_VOTING_MANAGER_ADDRESS) {
  throw Error("Set VotingManager address");
}
if (!process.env.NEXT_PUBLIC_ACCOUNT_MANAGER_ADDRESS) {
  throw Error("Set AccountManager address");
}

export const accountManagerAddress =
  process.env.NEXT_PUBLIC_ACCOUNT_MANAGER_ADDRESS;

export const votingManagerAddress =
  process.env.NEXT_PUBLIC_VOTING_MANAGER_ADDRESS;

export const provider = new ethers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
);

export const votingManagerContract = new ethers.Contract(
  votingManagerAddress,
  getVotingManagerAbi(),
  provider
) as unknown as VotingManager;

export const getVotingContract = async (votingAddress: string) => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    votingAddress,
    getVotingAbi(),
    signer
  ) as unknown as Voting;
  return contract;
};

export const getVotingManagerContract = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    votingManagerAddress,
    getVotingManagerAbi(),
    signer
  ) as unknown as VotingManager;
  return contract;
};

export const getAccountManagerContract = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    accountManagerAddress,
    getAccountManagerAbi(),
    signer
  ) as unknown as AccountManager;
  return contract;
};
