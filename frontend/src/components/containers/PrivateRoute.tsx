"use client";
import {
  authCredentials,
  me,
  signOut,
  updateCredentials,
} from "../../model/auth/authService";
import { useRouter } from "next/navigation";
import { useStore } from "effector-react";
import { ReactNode, useEffect } from "react";
import { ConfirmProvider } from "material-ui-confirm";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const authCredentialsUsage = useStore(authCredentials);
  const router = useRouter();
  useEffect(() => {
    if (!authCredentialsUsage) {
      me()
        .then((authCreds) => {
          console.log(
            "in PrivateRoute, authCreds is:\n" +
              JSON.stringify(authCreds, null, 2),
          );
        })
        .catch(() => {
          console.log("in PrivateRoute, errored, going to /");
          router.push("/");
        });
    }
  }, [authCredentialsUsage]);
  return (
    <ConfirmProvider>
      <div className="w-full h-auto min-h-screen flex flex-col border-box p-10 items-end justify-center ">
        <div className="w-full h-auto xs:grid flex items-center justify-between">
          <h2 className={"font-rem text-5xl text-center"}>Mindful Gurukul</h2>
          <div className="w-auto rounded-xl shadow-lg bg-gray-100 bg-opacity-80">
            <div className="px-6 py-4 xs:grid flex flew-row gap-3 items-center justify-center">
              {authCredentialsUsage ? (
                <>
                  <div className="font-bold text-xl text-gray-700">
                    {authCredentialsUsage?.userData?.name}
                  </div>
                  <p className="text-gray-700 text-base">
                    {authCredentialsUsage?.userData?.username}
                  </p>
                  <p className="text-gray-700 text-base">
                    {authCredentialsUsage?.userData?.phone}
                  </p>
                </>
              ) : null}
              <button
                // @ts-ignore
                onClick={
                  authCredentialsUsage
                    ? () => {
                        signOut().then(() => router.push("/"));
                      }
                    : undefined
                }
                className={"font-bold text-base text-gray-700"}
              >
                {authCredentialsUsage
                  ? "Sign Out"
                  : me.pending
                  ? "Retrieving..."
                  : "Signed Out"}
              </button>
            </div>
          </div>
        </div>
        <div className={"w-full h-auto min-h-screen"}>{children}</div>
      </div>
    </ConfirmProvider>
  );
}
