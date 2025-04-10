"use client";

import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import SolanaWallet from '@/components/SolanaWallet';
import { Button } from "@/components/ui/button";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const { publicKey } = useWallet();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-2 p-2">
            <p className="text-xl font-bold">Welcome!</p>
            <p>Logged in as {user.email ?? "anon"}</p>
          </div>

          {!publicKey ? (
            <div className="mt-4">
              <p className="mb-4 text-gray-600">Connect your wallet to continue</p>
              <WalletMultiButton />
            </div>
          ) : (
            <SolanaWallet publicKey={publicKey.toString()} />
          )}

          <Button 
            variant="destructive"
            className="mt-6" 
            onClick={() => logout()}
          >
            Log out
          </Button>
        </div>
      ) : (
        <Button onClick={openAuthModal}>
          Login
        </Button>
      )}
    </main>
  );
}
