"use client";

import { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { getBalance, requestAirdrop } from '@/lib/solana';
import { Button } from '@/components/ui/button';

export default function SolanaWallet({ publicKey }: { publicKey: string }) {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (publicKey) {
      fetchBalance();
    }
  }, [publicKey]);

  const fetchBalance = async () => {
    try {
      const pubKey = new PublicKey(publicKey);
      const bal = await getBalance(pubKey);
      setBalance(bal);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const handleAirdrop = async () => {
    try {
      setLoading(true);
      const pubKey = new PublicKey(publicKey);
      await requestAirdrop(pubKey);
      await fetchBalance();
    } catch (error) {
      console.error('Error requesting airdrop:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Solana Wallet</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Public Key</p>
        <p className="font-mono text-sm break-all">{publicKey}</p>
      </div>
      <div className="mb-6">
        <p className="text-sm text-gray-600">Balance</p>
        <p className="text-xl font-bold">{balance !== null ? `${balance} SOL` : 'Loading...'}</p>
      </div>
      <Button
        onClick={handleAirdrop}
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Requesting...' : 'Request Airdrop (1 SOL)'}
      </Button>
    </div>
  );
}
