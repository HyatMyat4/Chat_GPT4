import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { OpencloseEngin } from "../setting/ActionSlice";
import { create_chat } from "../constants";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
function CreatChat() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
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

  return (
    <div
      onClick={() => create_chat_mutation.mutate()}
      className="w-full h-[45px] border-[0.5px] border-[#9999a461] hover:bg-slate-200 dark:hover:bg-[#34353a6d]  cursor-pointer rounded-[5px] frc justify-start"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-5 h-5 mx-[10px] text-black dark:text-[#d0d0d0]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v12m6-6H6"
        />
      </svg>
      <span className=" text-black dark:text-[#F2F2F2] text-[14px] ">
        New Chat
      </span>
    </div>
  );
}

export default CreatChat;
