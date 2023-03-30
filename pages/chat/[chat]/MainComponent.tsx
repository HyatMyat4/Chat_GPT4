import React from "react";
import { FiSend, FiRefreshCw } from "react-icons/fi";
import { GoTriangleDown } from "react-icons/go";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { database } from "../../../FirebaseConfig";
import User_Message from "@/components/User_Message";
import ChatGPT_Message from "@/components/ChatGPT_Message";
import WecomeText from "@/components/WecomeText";
import { ExamplesC } from "../../../setting/ActionSlice";
import SideBar from "@/pages/SideBar";
import Header from "@/components/Header";
import { useSelector } from "react-redux";
import { OpencloseC } from "../../../setting/ActionSlice";

type props = {
  chatId: string;
  message: any;
};
export default function MainComponent({ chatId, message }: props) {
  const example_text = useSelector(ExamplesC);
  const openclose = useSelector(OpencloseC);
  const { data: session } = useSession();
  const [data, setdata] = useState<any>();
  const [Last_data, setLast_data] = useState<any>();
  const [Maxdata, setMaxdata] = useState<any>(24);
  const [height, setheight] = useState<number>(24);
  const [heightpx, setheightpx] = useState<any>("h-[24px]");
  const [Dymaicheight, setDymaicheight] = useState<number>(97);
  const [rows, setrows] = useState<number>(1);
  const [response_id, setresponse_id] = useState<any>();
  const [Thinking, setThinking] = useState<boolean>(false);
  const [havedata, sethavedata] = useState<boolean>(false);
  const endRef = useRef<any>();
  const model = "text-davinci-003";

  const ontextchange = (e: any) => {
    setLast_data("");
    sethavedata(false);
    setdata(e.target.value);
    if (data?.length > Dymaicheight && rows < 9) {
      setheight(height + 24);
      setrows(rows + 1);
      setMaxdata(data.length);
      setDymaicheight(Dymaicheight + 97);
    }
    if (data?.length < Maxdata) {
      setDymaicheight(Dymaicheight - 97);
      setheight(height - 24);
      setrows(rows - 1);
      setMaxdata(data.length - 97);
    }
    setheightpx(`h-[${height}px]`);
  };

  const AskedQuestion = async (e: string) => {
    setThinking(true);

    const input = data.trim();
    try {
      if (e !== "Regenerate") {
        setLast_data(data);
        const message: Client_Message = {
          text: input,
          creatAt: serverTimestamp(),
          user: {
            _id: session?.user?.email!,
            Name: session?.user?.name!,
            Profile: session?.user?.image! || "/user.png",
          },
        };

        const doc_id = await addDoc(
          collection(
            database,
            "users",
            session?.user?.email!,
            "chat",
            chatId,
            "messages"
          ),
          message
        );

        const MessageFake: Message = {
          text: "",
          creatAt: serverTimestamp(),
          user: {
            Name: "ChatGPT",
          },
        };
        const response_id = await addDoc(
          collection(
            database,
            "users",
            session?.user?.email!,
            "chat",
            chatId,
            "messages"
          ),
          MessageFake
        );

        setresponse_id(response_id.id);

        const res = await fetch("/api/AskQuestion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: input === "" ? Last_data : input,
            chatId,
            model,
            session,
            response_id: response_id.id,
          }),
        });
        setdata("");
        setDymaicheight(97);
        setheight(24);
        setThinking(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const scrollToBottom = () => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    const havedata = message?.docs.filter(
      (data: any) => data.id === response_id
    );

    if (havedata?.length) {
      sethavedata(true);
    } else {
      sethavedata(false);
    }
  }, [message]);

  useEffect(() => {
    setdata(example_text);
  }, [example_text]);

  return (
    <div className="w-full h-screen  frc justify-between   ">
      <div
        className={` w-0 950:min-w-[270px] h-screen z-[100]  ${
          openclose ? " animate-slideleft3 absolute " : "hidden 950:flex"
        }`}
      >
        <SideBar />
      </div>

      <div className="w-full h-screen fcc justify-between">
        <Header data={message?.docs[message?.docs.length - 1]} />
        <div
          id="cutomscoll"
          className="w-full h-[82vh] 950:h-[88vh] fcc  overflow-y-scroll   "
        >
          <div className="w-full h-auto pb-[40px]">
            {message?.docs?.length ? (
              message?.docs?.map((message_data: any) =>
                message_data?._document.data.value.mapValue.fields.user.mapValue
                  .fields.Name.stringValue === "ChatGPT" ? (
                  <ChatGPT_Message
                    key={message_data.id}
                    message={message}
                    message_Legngth={message.length}
                    session={session}
                    message_data={message_data}
                    response_id={response_id}
                  />
                ) : (
                  <User_Message
                    key={message_data.id}
                    message_data={message_data}
                  />
                )
              )
            ) : (
              <WecomeText />
            )}
            <div ref={endRef}></div>
          </div>
        </div>
        <div className="w-full h-[12vh] bg-slate-100 dark:bg-[#343541]  z-0 frc justify-center">
          <div className="w-full 1120:w-[750px] h-auto     ">
            <div className=" w-full   relative   h-auto m-auto fcc justify-between px-[20px] 1120:px-0">
              <div className="w-full h-auto relative fcc  ">
                <button
                  disabled={!Last_data}
                  onClick={() => AskedQuestion("Regenerate")}
                  className={`w-auto z-[50]
              ${
                response_id !== "" && data === "" && havedata === true
                  ? ""
                  : " hidden  "
              } disabled:opacity-[0.3] select-none h-[40px]
               cursor-pointer hover:bg-slate-300 dark:hover:bg-[#2a2b35] group  animate-slideleft px-[10px]   border frc border-slate-300 dark:border-[#444654] absolute
                top-[16px] right-[4px] rounded bg-slate-300 dark:bg-[#343541]`}
                >
                  <div
                    className="min-w-[120px] bg-slate-300 shadow-xl dark:bg-black hidden animate-slowfade  group-hover:flex frc  h-auto absolute top-[-28px] 
                   right-[-38px] frc px-[8px] py-[2px] rounded-full"
                  >
                    <span id="monospace" className="text-[10px] ">
                      Regenerate response
                    </span>
                    <GoTriangleDown className=" absolute bottom-[-10px] right-[48px] text-slate-300 dark:text-black " />
                  </div>
                  <FiRefreshCw className=" animate-Fastspin" />
                </button>
                <div className="w-full   border border-[#40414f12] h-auto frc bg-[#FFFFFF]  dark:bg-[#40414F] pl-[15px] py-[12px] rounded-[5px] shadow-lg my-[11px]">
                  <textarea
                    id="cutomscoll"
                    rows={rows}
                    value={data}
                    onChange={(e) => ontextchange(e)}
                    className={`w-[95%]  ${
                      height === 24 ? "h-[24px]" : `${heightpx}`
                    }   outline-none   focus:ring-0 ${
                      rows > 8 || rows === 8
                        ? " overflow-y-scroll"
                        : "overflow-y-hidden"
                    }  dark:bg-transparent
                m-0   resize-none border-0   bg-transparent p-0 pr-7  focus-visible:ring-0 
                `}
                  ></textarea>
                  <button
                    disabled={data === "" || Thinking}
                    onClick={() => AskedQuestion("")}
                    className={`pl-[4px] pr-[6px]  py-[4px] cursor-pointer ${
                      Thinking ? "bg-[#202123]" : "hover:bg-[#202123]"
                    } rounded disabled:text-gray-500 text-[#ACACBE] mr-[10px] 1120:mr-0 `}
                  >
                    {Thinking ? (
                      <div className="w-[17px] h-auto  select-none animate-Fastspin">
                        <img src="/topchatgptlogo.png" />
                      </div>
                    ) : (
                      <FiSend className="text-[17px] " />
                    )}
                  </button>
                </div>
                <div className="w-full frc text-[11px] text-[#94959A] mb-[25px] hidden 1120:flex">
                  <a
                    className=" underline mr-[5px] "
                    href="https://help.openai.com/en/articles/6825453-chatgpt-release-noteshttps://help.openai.com/en/articles/6825453-chatgpt-release-notes"
                  >
                    ChatGPT Mar 14 Version.
                  </a>
                  <span className="">
                    {" "}
                    Free Research Preview. Our goal is to make AI systems more
                    natural and safe to interact with. Your feedback will help
                    us improve.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
