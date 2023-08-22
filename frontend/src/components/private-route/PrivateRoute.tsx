"use client";
import {
  authCredentials,
  signOut,
  updateCredentials,
} from "../../model/service/authService";
import { useRouter } from "next/navigation";
import { useStore } from "effector-react";
import { useEffect } from "react";

export default function PrivateRoute({ children }) {
  const authCredentialsUsage = useStore(authCredentials);
  const router = useRouter();
  useEffect(() => {
    if (!authCredentialsUsage) {
      router.push("/");
    }
  }, []);
  return (
    <div className="w-full min-w-full max-w-full h-auto min-h-screen overflow-y-scroll flex flex-col border-box p-10 items-end justify-center ">
      <div className="w-auto rounded-xl shadow-lg bg-gray-100 bg-opacity-80">
        <div className="px-6 py-4 flex flew-row gap-3 items-center justify-center">
          <div className="font-bold text-xl text-gray-700">
            {authCredentialsUsage?.userData?.name}
          </div>
          <p className="text-gray-700 text-base">
            {authCredentialsUsage?.userData?.username}
          </p>
          <p className="text-gray-700 text-base">
            {authCredentialsUsage?.userData?.phone}
          </p>
          <button
            onClick={async () => {
              await signOut();
              updateCredentials(null);
            }}
            className={"font-bold text-base text-gray-700"}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className={"w-full h-auto min-h-screen"}>{children}</div>
    </div>
  );
}
