import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-700/20">
      <span className="loader" />
    </div>
  );
};

export default Loading;
