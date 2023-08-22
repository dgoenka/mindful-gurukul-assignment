"use client";
import PrivateRoute from "../../components/private-route/PrivateRoute";

export default function Home() {
  return (
    <PrivateRoute>
      <div>Hello</div>
    </PrivateRoute>
  );
}
