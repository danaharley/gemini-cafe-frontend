import React, { useEffect } from "react";

import { MdRamenDining } from "react-icons/md";
import Container from "../../../components/Container";
import CategoryItem from "./CategoryItem";
import { useCategoriesQuery } from "./categoryApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../product/productSlice";

const Categories = () => {
  const dispatch = useDispatch();

  const { category: cate } = useSelector((state) => state.products);

  const {
    isError: categoryIsError,
    error: errorCategory,
    isSuccess: categoryIsSuccess,
    data: categoryData,
  } = useCategoriesQuery();

  useEffect(() => {
    if (categoryIsError) {
      console.log(errorCategory);
    }
  }, [errorCategory, categoryIsError]);

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-1 scrollbar-hide md:pt-3">
        {categoryIsSuccess &&
          categoryData?.data?.map((category) => (
            <CategoryItem
              key={category?._id}
              label={category?.name}
              icon={MdRamenDining}
              selected={category?.name === cate}
              onClick={() => dispatch(setCategory(category?.name))}
            />
          ))}
      </div>
    </Container>
  );
};

export default Categories;
