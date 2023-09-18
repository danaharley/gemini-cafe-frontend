import React from "react";
import { MdOutlineDone, MdOutlineSchedule } from "react-icons/md";
import { FcProcess } from "react-icons/fc";
import { CiDeliveryTruck } from "react-icons/ci";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";

const StatusLabel = ({ status }) => {
  switch (status) {
    case "waiting_payment":
      return (
        <div className="inline-flex items-center gap-x-2 rounded-full bg-yellow-100/60 px-3 py-1 text-yellow-500">
          <MdOutlineSchedule size={18} />
          <h2 className="text-sm font-normal">Waiting Payment</h2>
        </div>
      );
    case "paid":
      return (
        <div className="inline-flex items-center gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-emerald-500">
          <MdOutlineDone size={18} />
          <h2 className="text-sm font-normal">Paid</h2>
        </div>
      );
    case "processing":
      return (
        <div className="inline-flex items-center gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-gray-500">
          <FcProcess size={18} />
          <h2 className="text-sm font-normal">Processing</h2>
        </div>
      );
    case "in_delivery":
      return (
        <div className="inline-flex items-center gap-x-2 rounded-full bg-gray-100/60 px-3 py-1 text-gray-500">
          <CiDeliveryTruck size={18} />
          <h2 className="text-sm font-normal">inDelivery</h2>
        </div>
      );
    case "delivered":
      return (
        <div className="inline-flex items-center gap-x-2 rounded-full bg-emerald-100/60 px-3 py-1 text-emerald-500">
          <AiOutlineDeliveredProcedure size={18} />
          <h2 className="text-sm font-normal">Delivered</h2>
        </div>
      );

    default:
      return <div />;
  }
};

export default StatusLabel;
