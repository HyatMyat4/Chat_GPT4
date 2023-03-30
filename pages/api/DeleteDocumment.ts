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
  const { userEmail, chatdata } = req.body;
  if (!userEmail || !chatdata) {
    return res.status(404).json({ answer: "Please Faill Information" });
  }

  const delete_data = async (e: string) => {
    const ProductRef = await Admindb.collection("users")
      .doc(userEmail)
      .collection("chat")
      .doc(e)
      .delete();
  };

  chatdata.map((chatdata: any) => {
    delete_data(chatdata.id);
  });

  res.status(200).json({ answer: userEmail });
}
