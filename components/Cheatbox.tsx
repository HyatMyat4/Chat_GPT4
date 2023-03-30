import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiTrash2 } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { collection, query } from "firebase/firestore";
import { database } from "../FirebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { OpencloseEngin } from "../setting/ActionSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
function Cheatbox({ id }: any) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const { chat } = router.query;
  const { data } = useSession();

  const [message]: any = useCollection(
    query(
      collection(database, "users", data?.user?.email!, "chat", id, "messages")
    )
  );

  const filter_Data = message?.docs.filter(
    (data: any) =>
      data._document.data.value.mapValue.fields.user.mapValue.fields.Name
        .stringValue !== "ChatGPT"
  );

  const handleDelete = async () => {
    const complete_delete = await deleteDoc(
      doc(database, "users", data?.user?.email!, "chat", id)
    );
  };

  const delete_mutation = useMutation({
    mutationFn: handleDelete,
    onMutate: async (deteteId: any) => {
      await queryClient.cancelQueries({ queryKey: ["chatList"] });
      const lastData = queryClient.getQueryData<chat_data[]>(["chatList"]);
      queryClient.setQueryData(
        ["chatList"],
        lastData?.filter((data: chat_data) => data.id !== deteteId)
      );
      return { lastData };
    },
    onError: (err, chatList, context) => {
      queryClient.setQueriesData(["chatList"], context?.lastData);
    },
  });
  return (
    <div className="w-full h-[45px] relative frc overflow-hidden mt-[8px] rounded-[5px] ">
      <Link
        onClick={() => dispatch(OpencloseEngin(false))}
        href={`/chat/${id}`}
        key={id}
        className={`w-full h-[45px] ${
          id === chat
            ? "bg-slate-200 dark:bg-[#343541]"
            : " hover:bg-slate-200 dark:hover:bg-[#2A2B32]"
        }  relative   cursor-pointer  frc  overflow-hidden  justify-start `}
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
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>

        <span className=" text-black dark:text-[#F2F2F2] text-[14px] ">
          {!filter_Data?.[0]?._document
            ? "New Chat"
            : filter_Data?.[0]?._document?.data?.value?.mapValue?.fields?.text.stringValue.slice(
                0,
                25
              )}
        </span>
      </Link>
      <div
        onClick={() => dispatch(OpencloseEngin(false))}
        className={`w-full h-full z-0 ${
          id === chat ? "" : "hidden"
        }  absolute left-0 opacity-0`}
      ></div>
      <div
        className={` ${
          id === chat ? "" : "hidden"
        }  z-50 absolute right-0  shadow-2xl bg-slate-200 dark:bg-[#343541] shadow-[#343541]  w-auto h-full text-black dark:text-slate-300 frc`}
      >
        <div
          onClick={() => delete_mutation.mutate(id)}
          className="mr-[10px] hover:text-rose-600 cursor-pointer"
        >
          <FiTrash2 />
        </div>
      </div>
    </div>
  );
}

export default Cheatbox;
