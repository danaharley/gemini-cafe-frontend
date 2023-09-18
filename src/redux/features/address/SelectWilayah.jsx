import React from "react";
import Select from "react-select";
import { useGetRegionQuery } from "./addressApiSlice";
import { Controller } from "react-hook-form";

const SelectWilayah = ({
  tingkat,
  kodeInduk,
  name,
  control,
  isDisabled,
  placeholder,
}) => {
  const {
    isLoading: addressIsLoading,
    isFetching: addressIsFetching,
    isSuccess: addressIsSuccess,
    data: addressData,
  } = useGetRegionQuery({ tingkat, kodeInduk });

  const loading = addressIsLoading || addressIsFetching;

  return (
    <Controller
      name={name}
      render={({ field: { onChange } }) => (
        <Select
          options={
            addressIsSuccess &&
            addressData &&
            addressData.map((wil) => ({
              value: wil.kode,
              label: wil.nama,
            }))
          }
          onChange={onChange}
          isClearable
          placeholder={placeholder}
          isLoading={loading}
          isDisabled={isDisabled}
          classNames={{
            control: () => "p-3 border-2",
            input: () => "text-lg",
            option: () => "text-lg",
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: "black",
            },
          })}
        />
      )}
      control={control}
      rules={{ required: true }}
    />
  );
};

export default SelectWilayah;
