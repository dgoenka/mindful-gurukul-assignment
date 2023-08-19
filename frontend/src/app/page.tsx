import { useRouter } from "next/router";
import { AuthButton } from "@/components/AuthButton";
import { router } from "next/client";

export default function Home() {
  return (
    <main className="w-100 h-auto min-h-screen flex flex-col items-center justify-center p-24 gap-12">
      <h2 className={"font-rem text-5xl"}>Welcome to Mindful Gurukul</h2>
      <AuthButton href={"/login"}>Login</AuthButton>
      <AuthButton
        className={"rounded-full bg-sky-700 p-5 w-2/5 font-rem text-3xl"}
      >
        Signup
      </AuthButton>
    </main>
  );
}
