"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { http, createConfig } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

interface Props {
  children: React.ReactNode;
}

export const config = createConfig({
  chains: [arbitrum, arbitrumSepolia],
  connectors: [injected()],
  transports: {
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export const WagmiContainer: React.FC<Props> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
