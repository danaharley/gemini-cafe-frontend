import React from "react";

const AddressList = ({
  id,
  name,
  details,
  provinces,
  regencies,
  districts,
  villages,
  checked,
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <input
        className="peer hidden"
        id={id}
        type="radio"
        name="address"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-neutral-300 bg-white peer-checked:border-indigo-500" />
      <label
        className="peer-checked:bg-zink-100 flex cursor-pointer select-none rounded-lg border border-neutral-300 p-4 peer-checked:border-2 peer-checked:border-indigo-300"
        htmlFor={id}
      >
        <div className="ml-5">
          <span className="mt-2 text-lg font-semibold text-neutral-800">
            {name}
          </span>
          <p className="text-sm uppercase leading-6 text-neutral-400">
            {provinces} {regencies} {districts} {villages}
          </p>
          <p className="text-sm uppercase leading-6 text-neutral-400">
            {details}
          </p>
        </div>
      </label>
    </div>
  );
};

export default AddressList;
