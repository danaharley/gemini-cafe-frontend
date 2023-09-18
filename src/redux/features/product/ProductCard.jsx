import React from "react";
import Button from "../../../components/Button";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import LazyImage from "../../../components/LazyImage";

const ProductCard = ({
  id,
  title,
  desc,
  price,
  imgSrc,
  alt,
  actionLabel,
  onClick,
}) => {
  return (
    <div className="group col-span-1 cursor-pointer">
      <div className="flex flex-col gap-2">
        <Link to={`products/${id}`}>
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            {/* <img
              src={imgSrc}
              alt={alt}
              className="h-full w-full object-cover transition group-hover:scale-110"
              loading="lazy"
            /> */}
            <LazyImage
              id={id}
              imgSrc={imgSrc}
              alt={alt}
              className="h-full w-full object-cover transition group-hover:scale-110"
            />
          </div>
        </Link>
        <h1 className="text-lg font-semibold text-neutral-800">{title}</h1>
        <div className="truncate font-light text-neutral-500">{desc}</div>
        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold text-neutral-800">{price}</div>
          <Button
            onClick={onClick}
            outline
            label={actionLabel}
            icon={BsFillCartPlusFill}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
