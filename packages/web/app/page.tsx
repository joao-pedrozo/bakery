"use client";

import { Button } from "@/components/ui/button";
import { useCakes } from "@/src/hooks/useCakes";

export default function Home() {
  const { data, status, error } = useCakes();

  const content = {
    pending: <div>Loading...</div>,
    error: <div>Error: {error?.message}</div>,
    success: <pre>{JSON.stringify(data, null, 2)}</pre>,
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-black sm:items-start">
        {content[status]}
      </main>
      <Button>A Button</Button>
    </div>
  );
}
