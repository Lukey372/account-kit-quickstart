"use client";

import { useAuthModal, useLogout, useSignerStatus, useUser } from "@account-kit/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const { publicKey, connected } = useWallet();
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    if (connected && publicKey) {
      setUserAddress(publicKey.toString());
    } else {
      setUserAddress(null);
    }
  }, [connected, publicKey]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <div className="animate-pulse">Loading...</div>
      ) : user ? (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">Welcome!</h2>
          <p className="text-gray-600">Logged in as {user.email ?? "anon"}</p>
          {userAddress && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Wallet Address:</p>
              <p className="font-mono text-sm break-all bg-gray-50 p-2 rounded">{userAddress}</p>
            </div>
          )}
          <div className="flex flex-col gap-2 mt-4">
            <WalletMultiButton className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" />
            <Button 
              onClick={() => logout()}
              variant="outline"
              className="mt-2"
            >
              Log out
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <Button 
            onClick={openAuthModal}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Connect Account
          </Button>
          <WalletMultiButton className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" />
        </div>
      )}
    </main>
  );
}
