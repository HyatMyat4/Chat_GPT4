import React from "react";
import { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
function index() {
  const [text, settext] = useState<boolean>(false);
  const [providers, setproviders] = useState<any>();
  const blar = () => {};

  useEffect(() => {
    fetch_Provider();
  }, []);

  const fetch_Provider = async () => {
    const providers = await getProviders();
    setproviders(providers);
  };

  return (
    <div className="w-full h-screen fcc justify-between bg-[white] text-black">
      <div className="w-[35px] h-[100px] frc">
        <img src="/topchatgptlogo.png" />
      </div>
      <div className="w-[95%] 500:w-[330px] h-auto fcc text-center m-auto">
        <span className="text-[35px] font-bold  text-[#2D333A]">
          Welcome back
        </span>

        <div
          onClick={() => settext(true)}
          className="w-full h-[55px] relative mt-[30px]"
        >
          {/* @ts-ignore  */}
          <input className={`w-full h-full text-[17px] bg-[white]  rounded px-[15px] py-[10px] border ${text ? "border-teal-600 " : "border-gray-400"            }  outline-none`} required=""
            inputmode="email"
            name="email"
            id="email"
            type="text"            
            autocomplete="username"
            autocapitalize="none"
            spellcheck="false"
            autofocus=""
          ></input>
          <span
            className={` bg-white  select-none  
         ${
           text
             ? "ml-[10px] text-teal-600  translate-y-[-13px] z-30 rounded text-[16px] px-[3px]"
             : "ml-[20px] text-[18px] text-gray-500 bottom-[15px]"
         } transition-all duration-100 absolute left-0 bg-white `}
          >
            Email adress
          </span>
        </div>
        <div className="w-full h-[55px] bg-teal-500 frc justify-center text-white text-[18px] cursor-pointer hover:bg-teal-600 rounded mt-[25px]">
          Continue
        </div>
        <div className="frc my-[15px]">
          <span>Don't have an account? </span>
          <Link href={"/auth/signin"} className="text-teal-500 ml-[5px]">
            Sign up
          </Link>
        </div>
        <div className="w-full h-auto relative  my-[10px]">
          <div className="w-full h-[1px] bg-gray-300 z-0"></div>
          <span className="  bg-white  absolute top-[-12px] px-[4px] text-[14px]  translate-x-[-11px] z-10">
            OR
          </span>
        </div>
        <div
          key={providers?.google.name}
          onClick={() =>
            signIn("google", {
              callbackUrl: "http://localhost:3000",
            })
          }
          className="w-full border border-gray-300 px-[15px] frc  hover:bg-[#E5E5E5] transition-all duration-75   justify-around py-[13px] cursor-pointer   rounded mt-[20px]"
        >
          <img src="/Google.png" className="w-[23px]" />
          <span
            id="Roboto"
            className="w-[85%] ml-[15px] text-[16px] text-start"
          >
            Continue with Google
          </span>
        </div>
        <div
          key={"azure-ad"}
          onClick={() =>
            signIn("azure-ad", {
              callbackUrl: "http://localhost:3000",
            })
          }
          className="w-full border border-gray-300 px-[15px] frc  hover:bg-[#E5E5E5] transition-all duration-75   justify-around py-[13px] cursor-pointer   rounded mt-[20px]"
        >
          <img src="/microsoft.png" className="w-[23px]" />
          <span
            id="Roboto"
            className="w-[85%] ml-[15px] text-[16px] text-start"
          >
            Continue with Microsoft
          </span>
        </div>
      </div>
      <div className="w-auto h-[70px] text-[15px] frc text-teal-500">
        <a href="https://openai.com/policies/terms-of-use">Terms of use</a>
        <span className="mx-[10px] text-gray-700">|</span>
        <a href="https://openai.com/policies/privacy-policy">Privacy policy</a>
      </div>
    </div>
  );
}

export default index;
