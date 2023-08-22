"use client";
import PrivateRoute from "../../components/private-route/PrivateRoute";
import { useStore } from "effector-react";
import { authCredentials } from "../../model/service/authService";

export default function Dashboard() {
  const authCredentialsUsage = useStore(authCredentials);
  return (
    <PrivateRoute>
      <div className="max-w-md min-w-md rounded-xl overflow-hidden shadow-lg bg-gray-100 bg-opacity-80">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-black">
            {authCredentialsUsage?.userData?.name}
          </div>
          <p className="text-gray-700 text-base">
            {authCredentialsUsage?.userData?.username}
            <br />
            {authCredentialsUsage?.userData?.phone}
          </p>
        </div>
      </div>
    </PrivateRoute>
  );
}
