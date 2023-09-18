import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch } from "react-redux";
import { setKeyword } from "../redux/features/product/productSlice";

const Search = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const onOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  const searchHandler = useDebouncedCallback((e) => {
    dispatch(setKeyword(e.target.value));
  }, 1000);

  return (
    <>
      <div className="relative flex items-center overflow-hidden rounded-full border bg-white p-1.5 focus-within:shadow sm:h-11 sm:rounded-lg sm:p-0">
        <div className="grid h-full place-items-center text-gray-300 sm:w-11">
          <FiSearch className="text-lg sm:text-xl" onClick={onOpenHandler} />
        </div>

        <input
          className="peer hidden h-full w-full text-sm text-neutral-700 outline-none sm:block"
          type="text"
          id="search"
          placeholder="Search something.."
          onChange={searchHandler}
        />
      </div>

      <div
        className={`fixed inset-0 z-10 transform overflow-hidden ease-in-out ${
          isOpen
            ? "-translate-y-0 opacity-100 transition-opacity duration-500"
            : "-translate-y-full opacity-0 transition-all delay-500"
        }`}
      >
        <div
          className={`delay-400 absolute top-0 h-auto w-full transform bg-white shadow-md transition-all duration-500 ease-in-out ${
            isOpen ? "-translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex h-full w-full items-center justify-center p-3">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch size={25} className="text-neutral-400" />
              </div>
              <input
                type="text"
                className="text-md text-neutral-00 ml-1 block h-14 w-full rounded border border-neutral-300 bg-inherit p-2.5 pl-10 tracking-wide outline-none"
                placeholder="Search for foods"
                onChange={searchHandler}
              />
            </div>
          </div>
        </div>
        <div className="h-full w-full cursor-pointer" onClick={onOpenHandler} />
      </div>
    </>
  );
};

export default Search;
