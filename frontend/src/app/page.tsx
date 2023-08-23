import { AuthButton } from "../components/buttons/AuthButton";

export default function Home() {
  return (
    <main className="w-100 h-auto min-h-screen flex  items-center justify-center ">
      <div className="w-100 w-full max-w-[600px] flex flex-col p-2 gap-12 items-center justify-center h-auto">
        <h2 className={"font-rem text-5xl text-center"}>Mindful Gurukul</h2>
        <AuthButton href={"/login"}>Login</AuthButton>
        <AuthButton href={"/signup"}>Signup</AuthButton>
      </div>
    </main>
  );
}
