"use client";
import { signOut } from "@/model/service/authService";
import { useRouter } from "next/navigation";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  return (
    <main className="w-100 h-auto min-h-screen flex p-10 items-center justify-center ">
      {children}
      <button
        style={{ position: "absolute", right: "5vw", top: "5vh" }}
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
      >
        Sign Out
      </button>
    </main>
  );
}
