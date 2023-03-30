import React from "react";
import { FiSun, FiZap, FiAlertTriangle, FiSend } from "react-icons/fi";
import { BsCodeSlash } from "react-icons/bs";
import { ExamplesEngin } from "../../setting/ActionSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { OpencloseEngin } from "../../setting/ActionSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { create_chat } from "../../constants";
import Header from "@/components/Header";
export default function MainComponent() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useSession();

  const call_Create = async () => {
    const id = await create_chat(data);
    router.push(`/chat/${id}`);
    dispatch(OpencloseEngin(false));
  };

  const create_chat_mutation = useMutation(call_Create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["chatList"]);
    },
  });

  const createNewChat = async (e: string) => {
    create_chat_mutation.mutate();
    dispatch(ExamplesEngin(e));
  };

  return (
    <div
      id="scroolbar1-hidden"
      className="w-full h-screen relative   m-auto fcc justify-between overflow-y-scroll"
    >
      <Header />
      <div className="w-full 1120:w-[750px] h-[94vh] relative   m-auto fcc justify-between   ">
        <div className="w-full h-auto mt-0 750:mt-[140px]">
          <div className="w-full h-[140px] frc justify-center">
            <span id="Roboto" className="text-[38px]">
              ChatGPT
            </span>
            <div className="ml-[10px] select-none animate-Fastspin">
              <img className="w-[40px]" src="/topchatgptlogo.png" />
            </div>
          </div>
          <div className="w-full h-auto frc  justify-around flex-wrap p-[10px] 550:p-0">
            <div className="w-[240px] h-auto fcc mr-0 450:mr-[10px]">
              <div className="w-full h-[60px] fcc mb-[20px] ">
                <div className="my-[15px]">
                  <FiSun className="text-[25px] " />
                </div>

                <span className="text-[18px]">Examples</span>
              </div>
              <div
                onClick={() =>
                  createNewChat("Explain quantum computing in simple terms")
                }
                className="px-[15px] cursor-pointer py-[10px] shadow-lg  text-[14px] mt-[13px] text-center hover:bg-[#D9D9E3] dark:hover:bg-[#202123] bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]"
              >
                "Explain quantum computing in simple terms" →
              </div>
              <div
                onClick={() =>
                  createNewChat(
                    "Got any creative ideas for a 10 year old’s birthday"
                  )
                }
                className="px-[15px] py-[10px] cursor-pointer shadow-lg text-[14px] text-center mt-[15px] hover:bg-[#D9D9E3] dark:hover:bg-[#202123] bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]"
              >
                "Got any creative ideas for a 10 year old’s birthday?" →
              </div>
              <div
                onClick={() =>
                  createNewChat("Give me popular postmalo and djsnake music")
                }
                className="px-[15px] py-[10px] cursor-pointer shadow-lg text-[14px] text-center mt-[15px] hover:bg-[#D9D9E3] dark:hover:bg-[#202123] bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]"
              >
                "Give me popular postmalo and djsnake music " →
              </div>
            </div>
            <div className="w-[240px]  fcc mr-0 450:mr-[10px]">
              <div className="w-full h-[60px] fcc mb-[20px] ">
                <div className="my-[15px]">
                  <BsCodeSlash className="text-[25px] " />
                </div>

                <span className="text-[18px]">Capabilities</span>
              </div>
              <div
                onClick={() =>
                  createNewChat(
                    "Give me c++ code for basic fps shooting 3d game"
                  )
                }
                className="px-[15px] py-[10px] cursor-pointer shadow-lg text-[14px] text-center mt-[15px] hover:bg-[#D9D9E3] dark:hover:bg-[#202123] bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]"
              >
                "Give me c++ code for basic fps shooting 3d game" →
              </div>
              <div
                onClick={() =>
                  createNewChat("Give me python code for machine learning")
                }
                className="px-[15px] py-[10px] cursor-pointer shadow-lg text-[14px] text-center mt-[15px] hover:bg-[#D9D9E3] dark:hover:bg-[#202123] bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]"
              >
                "Give me python code for machine learning" →
              </div>
              <div
                onClick={() =>
                  createNewChat("How do I make an HTTP request in Javascript")
                }
                className="px-[15px] py-[10px] cursor-pointer shadow-lg text-[14px] text-center mt-[15px] hover:bg-[#D9D9E3] dark:hover:bg-[#202123] bg-[#F7F7F8] dark:bg-[#3f404d] rounded-[5px]"
              >
                "How do I make an HTTP request in Javascript?" →
              </div>
            </div>
            <div className="w-[240px]  fcc mr-0 450:mr-[10px]">
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
    </div>
  );
}
