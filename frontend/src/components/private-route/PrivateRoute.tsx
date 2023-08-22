"use client";
import { authCredentials, signOut } from "../../model/service/authService";
import { useRouter } from "next/navigation";
import { useStore } from "effector-react";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const authCredentialsUsage = useStore(authCredentials);
  const router = useRouter();
  console.log(
    "in Dashboard, authCredentialsUsage is:\n" +
      JSON.stringify(authCredentialsUsage, null, 2),
  );
  useEffect(() => {
    if (!authCredentialsUsage) {
      router.push("/");
    }
  }, []);
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
