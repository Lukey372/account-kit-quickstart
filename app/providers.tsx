"use client";
import { config, queryClient } from "@/config";
import { AlchemyClientState } from "@account-kit/core";
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense, useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");

export const Providers = (
  props: PropsWithChildren<{ initialState?: AlchemyClientState }>
) => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  const endpoint = "https://solana-mainnet.g.alchemy.com/v2/_EG9_ioKKYgIJhAE_eOfcLhXOh7bzRgx";

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <AlchemyAccountProvider
              config={config}
              queryClient={queryClient}
              initialState={props.initialState}
            >
              {props.children}
            </AlchemyAccountProvider>
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
