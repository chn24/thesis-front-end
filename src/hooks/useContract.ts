import {
  BaseContract,
  BrowserProvider,
  Contract,
  InterfaceAbi,
  JsonRpcSigner,
} from "ethers";
import { useMemo } from "react";

export function useContract<T extends Contract | BaseContract = Contract>(
  address: string,
  ABI: InterfaceAbi,
  provider: Nullable<BrowserProvider>,
  signer: Nullable<JsonRpcSigner>
) {
  const contract = useMemo(() => {
    if (!signer || !provider || !address) return null;
    return new Contract(address, ABI, provider).connect(signer) as T;
  }, [signer, provider, address]);
  return contract;
}
