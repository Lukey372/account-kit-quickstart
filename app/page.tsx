"use client";

import { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import SolanaWallet from '@/components/SolanaWallet';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [wallet, setWallet] = useState<Keypair | null>(null);

  const createWallet = () => {
    const newWallet = Keypair.generate();
    setWallet(newWallet);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Solana Wallet Demo</h1>
        
        {!wallet ? (
          <div className="text-center">
            <Button onClick={createWallet} className="mx-auto">
              Create New Wallet
            </Button>
          </div>
        ) : (
          <SolanaWallet publicKey={wallet.publicKey.toString()} />
        )}
      </div>
    </main>
  );
}
