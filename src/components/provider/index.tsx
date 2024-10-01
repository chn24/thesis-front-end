import { ReactNode } from "react";
import { WagmiContainer } from "./wagmi";

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <WagmiContainer>{children}</WagmiContainer>;
};
