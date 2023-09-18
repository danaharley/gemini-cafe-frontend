import React from "react";
import LazyImage from "./LazyImage";

const Avatar = ({ imgSrc, alt }) => {
  return (
    <LazyImage
      imgSrc={imgSrc}
      alt={alt}
      className="h-8 w-8 rounded-full object-cover"
    />
  );
};

export default Avatar;
