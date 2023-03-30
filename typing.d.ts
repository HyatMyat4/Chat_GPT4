type Message = {
    text : any 
    creatAt : Timestamp
    user:  {
      Name : string
    }
 }
type Client_Message = {
    text : any 
    creatAt : Timestamp
    user: {
      _id : string
      Name : string
      Profile : string
    }
 }

 type chat_data = {
   id : string
   timestamp: any
 } 
 
 type Single_chat_data = {
   id : string
   user : string
   userImage: string | null | undefined
   timestamp: any
   text : string
 } 