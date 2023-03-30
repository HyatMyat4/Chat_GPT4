// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import query from "../../lib/query";
import { Admindb } from "../../firebaseAdmin";
type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session, response_id } = req.body;
  if (!prompt || !chatId || !model || !session || !response_id) {
    return res.status(404).json({ answer: "Please Faill Information" });
  }

  const response = await query({ prompt, model, chatId });

  const Message = {
    text: response || "ChatGPT was unable to find an answer fro that!",      
  };

  await Admindb.collection("users")
    .doc(session?.user?.email)
    .collection("chat")
    .doc(chatId)
    .collection("messages")
    .doc(response_id)
    .update(Message);

  res.status(200).json({ answer: Message.text });
}
