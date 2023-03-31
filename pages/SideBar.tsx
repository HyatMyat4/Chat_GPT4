import React from "react";
import { FiTrash2, FiUser, FiLogOut, FiAlertTriangle } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import LightDark from "../components/LightDark";
import { useRouter } from "next/navigation";
import Cheatbox from "@/components/Cheatbox";
import { useEffect } from "react";
import CreatChat from "../components/CreatChat";
import { ChaoticOrbit } from "@uiball/loaders";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

function SideBar() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session } = useSession();

  const [areyousure, setareyousure] = useState<boolean>(false);
  const getchatList = async () => {
    if (session?.user) {
      const res = await fetch("/api/GetChatList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session.user.email,
        }),
      });
      const chatList = await res.json();
      const data = chatList.sort(function (a: any, b: any) {
        return a.timestamp - b.timestamp;
      });

      return data;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["chatList"],
    queryFn: getchatList,
  });

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [signOut]);

  const logOut = () => {
    signOut();
  };

  const delete_conversations = async () => {
    setareyousure(false);
    const res = await fetch("/api/DeleteDocumment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: session?.user?.email,
        chatdata: data,
      }),
    });
  };

  const mutation = useMutation({
    mutationFn: delete_conversations,
    onMutate: async (deteteId) => {
      await queryClient.cancelQueries({ queryKey: ["chatList"] });
      const lastData = queryClient.getQueryData<chat_data[]>(["chatList"]);

      queryClient.setQueryData(
        ["chatList"],
        lastData?.filter((data: chat_data) => data.id === "404")
      );
      return { lastData };
    },
    onError: (err, chatList, context) => {
      queryClient.setQueriesData(["chatList"], context?.lastData);
    },
  });

  const any = () => {};
  return (
    <div
      className={` min-w-[270px] 950:w-full h-screen z-50 absolute  950:static  ${
        !session ? "hidden" : ""
      } bg-slate-100  dark:bg-[#202123] fcc px-[8px] `}
    >
      <div  className="w-full h-[74vh]   "> 
         <div className="w-full h-full fcc">
        <div className="w-full h-[8%]">
        <CreatChat />
        </div>
        <div id='scroolbar1-hidden' className="w-full h-[92%] overflow-y-scroll overflow-hidden   pb-[40px]">
        {isLoading && !data ? (
          <div className="w-full h-full fcc justify-center ">
            <div className="w-[50px] h-auto select-none ">
              <ChaoticOrbit size={30} speed={1.5} color="#009688" />
            </div>
            <span className=" animate-pulse mt-[10px]">loading...</span>
          </div>
        ) : (
          data?.map((data: any) => <Cheatbox key={data.id} id={data.id} />)
        )}
        </div>
        </div>
      </div>
      <div className="w-full h-[26vh]  fcc select-none ">
        <div className="w-full h-[1px] bg-[#9999a461]"></div>
        <div
          onClick={areyousure ? () => any : () => setareyousure(true)}
          className={`w-full h-[45px]  
          ${
            areyousure
              ? "bg-rose-600 justify-between"
              : "hover:bg-slate-200 dark:hover:bg-[#2A2B32] justify-start"
          } group  mt-[5px] cursor-pointer rounded-[5px] frc  `}
        >
          <div className="w-auto frc">
            {areyousure ? (
              <FiAlertTriangle
                className={`  mx-[10px] ${
                  areyousure ? " text-black dark:text-[#d0d0d0]" : "text-rose-600"
                } `}
              />
            ) : (
              <FiTrash2 className=" text-black dark:text-[#d0d0d0] mx-[10px]" />
            )}

            <span className=" text-black dark:text-[#F2F2F2] text-[14px] ">
              {areyousure ? "Are you sure " : "Clear conversations"}
            </span>
          </div>
          {areyousure ? (
            <div id="monospace" className="mr-[15px]  z-0  frc">
              <div
                onClick={() => mutation.mutate(data)}
                className="mr-[5px]  ScaleAnimation110 z-50 "
              >
                Yes
              </div>
              /
              <div
                onClick={() => setareyousure(false)}
                className="ml-[6px] ScaleAnimation110 z-50"
              >
                No
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-full h-[45px]  hover:bg-slate-200 dark:hover:bg-[#2A2B32] mt-[1px] cursor-pointer rounded-[5px] frc  justify-between ">
          <div className="w-auto h-auto frc justify-start">
            <FiUser className=" text-black dark:text-[#d0d0d0] mx-[10px]" />
            <span className=" text-black dark:text-[#F2F2F2] text-[14px] ">
              Upgrade to plus
            </span>
          </div>
          <span
            id="Roboto"
            className="w-auto  frc  bg-[#FAE69E] text-[13px] px-[6px]  rounded-[6px] mr-[10px] "
          >
            <span className="mt-[2px] text-[#2A2B32]">NEW</span>
          </span>
        </div>
        <LightDark />
        <a
          href="https://help.openai.com/en/collections/3742473-chatgpt"
          className="w-full h-[45px]  hover:bg-slate-200 dark:hover:bg-[#2A2B32] mt-[1px] cursor-pointer rounded-[5px] frc justify-start "
        >
          <BsBoxArrowUpRight className=" text-black dark:text-[#d0d0d0] mx-[10px]" />

          <span className=" text-black dark:text-[#F2F2F2] text-[14px] ">Updates & FAQ</span>
        </a>
        <div
          onClick={() => logOut()}
          className="w-full h-[45px]  hover:bg-slate-200 dark:hover:bg-[#2A2B32] mt-[1px] cursor-pointer rounded-[5px] frc justify-start "
        >
          <FiLogOut className=" text-black dark:text-[#d0d0d0] mx-[10px]" />

          <span className=" text-black dark:text-[#F2F2F2] text-[14px] ">Log out</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
