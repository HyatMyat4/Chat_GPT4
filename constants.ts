import { collection, orderBy, query , addDoc,  serverTimestamp  } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { database } from "./FirebaseConfig";


 export const create_chat = async (data : any) => {    
    const doc = await addDoc(
      collection(database, "users", data?.user?.email!, "chat"),
      {
        userId: data?.user?.email,
        createAt: serverTimestamp(),
      }
    );
    return doc.id;   
  };

