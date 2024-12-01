import { getVotingAbi } from "@/abi/votingAbi";
import { getVotingManagerAbi } from "@/abi/votingManagerAbi";
import { Voting } from "@/types/contract/voting";
import { VotingManager } from "@/types/contract/votingManager";
import { ethers } from "ethers";

if (!process.env.NEXT_PUBLIC_VOTING_MANAGER_ADDRESS) {
  throw Error("Set VotingManager address");
}

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
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(
    votingAddress,
    getVotingAbi(),
    signer
  ) as unknown as Voting;
  return contract;
};
