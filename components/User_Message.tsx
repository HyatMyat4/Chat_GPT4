import React from "react";
import { DocumentData } from "firebase/firestore";
type Props = {
  message_data: DocumentData;
};
function User_Message({ message_data }: Props) {
  return (
    <div className="w-full h-auto frc justify-center">
      <div className="w-full 1120:w-[750px] h-auto frc items-start  justify-start 1120:justify-start py-[20px] px-[10px]">
        <div className="min-w-[39px] 500:min-w-[50px] h-full fcc items-start justify-start">
          <div className="w-[30px] 500:w-[35px] h-auto ScaleAnimation">
            <img
              className=" rounded-[3px]"
              src={
                message_data?._document.data.value.mapValue.fields.user.mapValue
                  .fields.Profile.stringValue
                  ? message_data?._document.data.value.mapValue.fields.user
                      .mapValue.fields.Profile.stringValue
                  : "/user.png"
              }
            />
          </div>
        </div>
        <div className="w-auto 1120:w-[700px] h-auto">
          <p className="text-[14px] 690:text-[16px]">
            {
              message_data?._document.data.value.mapValue.fields.text
                .stringValue
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default User_Message;
