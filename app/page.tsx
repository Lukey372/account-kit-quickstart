"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <div className="animate-pulse">Loading...</div>
      ) : user ? (
        <div className="flex flex-col gap-2 p-6 bg-white rounded-lg shadow-md">
          <p className="text-2xl font-bold text-gray-800">Success!</p>
          <p className="text-gray-600">
            You&apos;re logged in as {user.email ?? "anon"}.
          </p>
          <Button 
            onClick={() => logout()}
            variant="outline"
            className="mt-4"
          >
            Log out
          </Button>
        </div>
      ) : (
        <Button 
          onClick={openAuthModal}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Login
        </Button>
      )}
    </main>
  );
}
