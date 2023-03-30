import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
function HomeScreen() {
  const router = useRouter();
  const { data } = useSession();
  const email = data?.user?.email;

  useEffect(() => {
    if (email) {
      router.push("/chat");
    }
  }, [data]);

  return (
    <div className={`w-auto ${email ? "hidden" : ""}   h-auto fcc text-white`}>
      <div className="w-[45px] animate-Fastspin">
        <img src="/topchatgptlogo.png" />
      </div>
      <span className="mt-[15px] ">Welcome to ChatGPT</span>
      <span className="mt-[10px] text-center ">
        Log in with your OpenAI account to continue
      </span>
      <div className="mt-[15px] frc ">
        <Link
          href={"/auth/Login"}
          className="px-[20px]  py-[7px] mr-[12px] ScaleAnimation  cursor-pointer bg-teal-600 hover:bg-teal-700 rounded-[5px] "
        >
          Log in
        </Link>
        <Link
          href={"/auth/signin"}
          className="px-[20px]  py-[7px] ScaleAnimation cursor-pointer bg-teal-600 hover:bg-teal-700 rounded-[5px] "
        >
          Sing up
        </Link>
      </div>
    </div>
  );
}

export default HomeScreen;
