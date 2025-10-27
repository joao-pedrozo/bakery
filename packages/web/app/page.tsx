"use client";

import Image from "next/image";
import { useCakes } from "@/src/hooks/useCakes";

export default function Home() {
  const { data, error, isLoading } = useCakes();

  console.log(123, data, error, isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    </div>
  );
}
