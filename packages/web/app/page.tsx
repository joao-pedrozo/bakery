import Image from "next/image";
import { elysia } from "../../api/src/client";

export default async function Home() {
  const { data } = await elysia.cakes.get();

  if (!data) {
    return <div>Error</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Olá</h1>
      </main>
    </div>
  );
}
