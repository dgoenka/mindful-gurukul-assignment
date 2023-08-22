"use client";
import PrivateRoute from "../../components/private-route/PrivateRoute";
import { useStore } from "effector-react";
import { authCredentials } from "../../model/service/authService";

export default function Dashboard() {
  const authCredentialsUsage = useStore(authCredentials);
  return (
    <PrivateRoute>
      <div className={"w-full h-auto"}>
        <button
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            borderRadius: "50%",
            backgroundColor: "#2196F3",
            color: "#E1E1E1",
            fontSize: "2rem",
            aspectRatio: 1,
            width: "4rem",
            height: "4rem",
            textAlign: "center",
            boxShadow: "8px 8px 17px 0px rgba(130,130,130,0.5)",
          }}
        >
          +
        </button>
      </div>
    </PrivateRoute>
  );
}
