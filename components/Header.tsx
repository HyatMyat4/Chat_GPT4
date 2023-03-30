import React from "react";
import { FiAlignLeft, FiSlack, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { OpencloseEngin, OpencloseC } from "../setting/ActionSlice";
function Header({ data }: any) {
  const dispatch = useDispatch();
  const openclose = useSelector(OpencloseC);

  return (
    <div
      className={`w-full h-[6vh]  frc ${
        openclose ? "" : ""
      } flex 950:hidden justify-between shadow-lg border-b border-[#5D5D67] `}
    >
      <div
        onClick={() => dispatch(OpencloseEngin(true))}
        className="w-auto h-full frc ml-[15px] cursor-pointer"
      >
        <FiAlignLeft className="text-[30px]" />
      </div>
      <div
        id="monospace"
        className="text-[#D1D5DB] text-[14px] 500:text-[16px]"
      >
        { data?._document.data.value.mapValue.fields.text.stringValue ?
        data?._document.data.value.mapValue.fields.text.stringValue
          .slice(0, 20)
          .toUpperCase()
        : 'New Chat'
        }
      </div>
      {openclose ? (
        <div
          onClick={() => dispatch(OpencloseEngin(false))}
          className="p-[4px]  border border-slate-200 hover:ScaleAnimation animate-slowfade rounded-[3px] mr-[15px] cursor-pointer  "
        >
          <FiX className=" text-[20px] " />
        </div>
      ) : (
        <div className="w-auto h-full frc mr-[15px] animate-slowfade cursor-pointer">
          <FiSlack className="text-[25px]" />
        </div>
      )}
    </div>
  );
}

export default Header;
