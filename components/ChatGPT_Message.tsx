import React from "react";
import { FiThumbsUp, FiThumbsDown, FiSend } from "react-icons/fi";
import { IoMdThumbsUp, IoMdThumbsDown } from "react-icons/io";
import { DocumentData } from "firebase/firestore";
import TextLoading from "./TextLoading";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
type Props = {
  session: any;
  message_data: DocumentData;
  message: DocumentData;
  message_Legngth: number;
  response_id: string;
};

export default function ChatGPT_Message({ message_data, response_id }: Props) {
  const [thumbup, setthumbup] = useState<boolean>(false);
  const [thumbDown, setthumbDown] = useState<boolean>(false);

  const Give_Thumbs = (e: string) => {
    if (e === "givethumbs") {
      setthumbup(true);
      setthumbDown(false);
    } else {
      setthumbup(false);
      setthumbDown(true);
    }
  };
  const log = {
    data: message_data?._document.data.value.mapValue.fields.text.stringValue,
  };

  return (
    <div className="w-full bg-slate-200 dark:bg-[#444654] h-auto frc items-start justify-center ">
      <div className="w-full 1120:w-[750px] h-auto frc items-start  justify-between  py-[20px] px-[10px]">
        <div className="w-auto h-auto frc    items-start justify-center 1120:justify-start">
          <div className="min-w-[35px] 500:min-w-[50px] h-full  fcc items-start justify-start ">
            <div className="w-[30px] 500:w-[36px] select-none h-auto   bg-[#202123] p-[4px] ScaleAnimation rounded">
              <img
                className={` ${
                  message_data?._document.data.value.mapValue.fields.text
                    .stringValue === ""
                    ? "animate-Fastspin"
                    : ""
                } rounded-[3px] `}
                src="/topchatgptlogo.png"
              />
            </div>
          </div>
          <div className="w-auto 1120:w-[640px] h-auto ">
            {message_data?.id === response_id &&
            message_data?._document.data.value.mapValue.fields.text
              .stringValue !== "" ? (
              <p
                id="white-space1"
                className="mb-[20px]   prose text-black dark:text-[#D1D5DB] break-words"
              >
                <Typewriter
                  words={[
                    message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                      0,
                      2
                    ) === "\n\n"
                      ? message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                          2
                        )
                      : message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                          0,
                          2
                        ) === "\n"
                      ? message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                          1
                        )
                      : message_data?._document.data.value.mapValue.fields.text
                          .stringValue,
                  ]}
                  loop={1}
                  cursor
                  cursorStyle="▌"
                  typeSpeed={60}
                  deleteSpeed={0}
                  delaySpeed={2000}
                />
              </p>
            ) : (
              <p
                id="white-space1"
                className="mb-[20px] text-[14px] 690:text-[16px]  prose text-black dark:text-[#D1D5DB] break-words"
              >
                {message_data?._document.data.value.mapValue.fields.text
                  .stringValue === "" ? (
                  <TextLoading />
                ) : message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                    0,
                    2
                  ) === "\n\n\n" ? (
                  message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                    3
                  )
                ) : message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                    0,
                    2
                  ) === "\n\n" ? (
                  message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                    2
                  )
                ) : message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                    0,
                    2
                  ) === "\n" ? (
                  message_data?._document.data.value.mapValue.fields.text.stringValue?.slice(
                    1
                  )
                ) : (
                  message_data?._document.data.value.mapValue.fields.text
                    .stringValue
                )}
              </p>
            )}
          </div>
        </div>
        <div className="w-auto 690:w-[60px] h-full fcc  690:frc items-start  text-slate-300   justify-center ">
          <div
            onClick={() => Give_Thumbs("givethumbs")}
            className="p-[5px] rounded cursor-pointer mr-[5px]  hover:bg-[#40414F]"
          >
            {thumbup ? <IoMdThumbsUp /> : <FiThumbsUp />}
          </div>
          <div
            onClick={() => Give_Thumbs("")}
            className="p-[5px] rounded  cursor-pointer hover:bg-[#40414F]"
          >
            {thumbDown ? <IoMdThumbsDown /> : <FiThumbsDown />}
          </div>
        </div>
      </div>
    </div>
  );
}
