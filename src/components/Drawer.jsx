import React from "react";
import { IoClose } from "react-icons/io5";

const Drawer = ({
  label,
  isOpen,
  onOpen,
  icon: Icon,
  body,
  badge,
  onClose,
}) => {
  return (
    <>
      <div className="relative cursor-pointer" onClick={onOpen}>
        {badge !== 0 && (
          <div className="absolute -right-2.5 -top-3.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-400 text-center text-xs text-white">
              {badge}
            </span>
          </div>
        )}
        <Icon className="text-2xl text-neutral-500" />
      </div>

      <div
        className={`fixed inset-0 z-10 transform overflow-hidden ease-in-out ${
          isOpen
            ? "translate-x-0 opacity-100 transition-opacity duration-500"
            : "translate-x-full opacity-0 transition-all delay-500"
        }`}
      >
        <div
          className={`delay-400 absolute right-0 h-full w-screen max-w-lg transform bg-white shadow-xl transition-all duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="relative flex h-full w-screen max-w-lg flex-col overflow-y-scroll">
            <div className="flex items-center justify-between p-4">
              <div className="text-lg font-bold">{label}</div>
              <IoClose className="cursor-pointer text-xl" onClick={onClose} />
            </div>
            {body}
          </div>
        </div>
        <div className="h-full w-screen cursor-pointer" onClick={onOpen} />
      </div>
    </>
  );
};

export default Drawer;
