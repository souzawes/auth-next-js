'use client'

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push('/login')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleRedirect}
        className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Go to Login
      </button>
    </div>
  );
}
