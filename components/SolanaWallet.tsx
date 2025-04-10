"use client";

import { useState, useEffect, useCallback } from 'react';
import { PublicKey } from '@solana/web3.js';
import { getBalance } from '@/lib/solana';
import { Button } from '@/components/ui/button';
import { useWallet } from '@solana/wallet-adapter-react';

export default function SolanaWallet({ publicKey }: { publicKey: string }) {
  const [balance, setBalance] = useState<number | null>(null);
  const { disconnect } = useWallet();

  const fetchBalance = useCallback(async () => {
    try {
      const pubKey = new PublicKey(publicKey);
      const bal = await getBalance(pubKey);
      setBalance(bal);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }, [publicKey]);

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey, fetchBalance]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Your Wallet</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Public Key</p>
        <p className="font-mono text-sm break-all">{publicKey}</p>
      </div>
      <div className="mb-6">
        <p className="text-sm text-gray-600">Balance</p>
        <p className="text-xl font-bold">{balance !== null ? `${balance} SOL` : 'Loading...'}</p>
      </div>
      <Button
        onClick={() => disconnect()}
        variant="outline"
        className="w-full"
      >
        Disconnect Wallet
      </Button>
    </div>
  );
}
