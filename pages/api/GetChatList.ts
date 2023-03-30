// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

import { database } from "../../FirebaseConfig";
type Data = {
  answer: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<chat_data[] | Data >
) {
  const { userEmail } = req.body;
  if (!userEmail) {
    return res.status(404).json({ answer: "Please Faill Information" });
  }

  const chat: any = await getDocs(
    collection(database, "users", userEmail, "chat")
  );
  let chatList: chat_data[] = [];
  const chats = await chat.forEach((doc: any) => {
    chatList.push({
      id: doc.id,
      timestamp: doc.data().createAt.seconds,
    });
  });  

  res.status(200).json(chatList);
}
