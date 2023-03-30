import React from "react";
import { FiSun, FiZap, FiAlertTriangle, FiSend } from "react-icons/fi";
import { ExamplesEngin } from "../setting/ActionSlice";
import { useDispatch } from "react-redux";

function WecomeText() {
  const dispatch = useDispatch();
  return (
    <div className="w-[98%] 1120:w-[750px] h-auto relative   m-auto fcc justify-between">
      <div className="w-full h-auto mt-[140px]">
        <div className="w-full h-[140px] frc justify-center">
          <span id="Roboto" className="text-[38px]">
            ChatGPT
          </span>
          <div className="ml-[10px] select-none animate-Fastspin">
            <img className="w-[40px]" src="/topchatgptlogo.png" />
          </div>
        </div>
        <div className="w-full h-auto frc  justify-around flex-wrap">
          <div className="w-[240px] h-auto fcc mr-0 500:mr-[10px]">
            <div className="w-full h-[60px] fcc mb-[20px] ">
              <div className="my-[15px]">
                <FiSun className="text-[25px] " />
              </div>

              <span className="text-[18px]">Examples</span>
            </div>
            <div
              onClick={() =>
                dispatch(
                  ExamplesEngin("Explain quantum computing in simple terms")
                )
              }
              className="px-[15px] cursor-pointer py-[10px] shadow-lg  text-[14px] mt-[13px] text-center hover:bg-[#D9D9E3] dark:hover:bg-[#202123] bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]"
            >
              "Explain quantum computing in simple terms" →
            </div>
            <div
              onClick={() =>
                dispatch(
                  ExamplesEngin(
                    "Got any creative ideas for a 10 year old’s birthday"
                  )
                )
              }
              className="px-[15px] py-[10px] cursor-pointer shadow-lg text-[14px] text-center mt-[15px] hover:bg-[#D9D9E3] dark:hover:bg-[#202123] bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]"
            >
              "Got any creative ideas for a 10 year old’s birthday?" →
            </div>
            <div
              onClick={() =>
                dispatch(
                  ExamplesEngin("How do I make an HTTP request in Javascript")
                )
              }
              className="px-[15px] py-[10px] cursor-pointer shadow-lg text-[14px] text-center mt-[15px] hover:bg-[#D9D9E3] dark:hover:bg-[#202123] bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]"
            >
              "How do I make an HTTP request in Javascript?" →
            </div>
          </div>
          <div className="w-[240px]  fcc mr-0 500:mr-[10px]">
            <div className="w-full h-[60px] fcc mb-[20px] ">
              <div className="my-[15px]">
                <FiZap className="text-[25px] " />
              </div>

              <span className="text-[18px]">Capabilities</span>
            </div>
            <div className="px-[15px]  cursor-pointer py-[10px] shadow-lg text-[14px] mt-[13px] text-center  bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]">
              Remembers what user said earlier in the conversation
            </div>
            <div className="px-[15px] cursor-pointer py-[10px] shadow-lg text-[14px] mt-[13px] text-center  bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]">
              Allows user to provide follow-up corrections
            </div>
            <div className="px-[15px] cursor-pointer py-[10px] shadow-lg text-[14px] mt-[13px] text-center  bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]">
              Trained to decline inappropriate requests
            </div>
          </div>
          <div className="w-[240px]  fcc mr-0 500:mr-[10px]">
            <div className="w-full h-[60px] fcc mb-[20px] ">
              <div className="my-[15px]">
                <FiAlertTriangle className="text-[25px] " />
              </div>
              <span className="text-[18px]">Limitations</span>
            </div>
            <div className="px-[15px] cursor-pointer py-[10px] shadow-lg text-[14px] mt-[13px] text-center  bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]">
              May occasionally generate incorrect information
            </div>
            <div className="px-[15px] cursor-pointer py-[10px] shadow-lg text-[13px] mt-[13px] text-center  bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]">
              May occasionally produce harmful instructions or biased content
            </div>
            <div className="px-[15px] cursor-pointer py-[10px] shadow-lg  text-[14px] mt-[13px] text-center  bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]">
              Limited knowledge of world and events after 2021
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WecomeText;
