import React, { useEffect } from "react";
import Modal from "../../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setAddressModalIsOpen } from "../modal/modalSlice";
import Heading from "../../../components/Heading";
import SelectWilayah from "./SelectWilayah";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import { useAddAddressMutation } from "./addressApiSlice";
import { toast } from "react-hot-toast";

const AddressFormModal = () => {
  const dispatch = useDispatch();

  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const allFields = watch();

  const { addressModalIsOpen } = useSelector((state) => state.globalModal);

  const [
    createAddress,
    {
      isError: createAddressIsError,
      error: createAddressError,
      isLoading: createAddressIsLoading,
      isSuccess: createAddressIsSuccess,
      data: addressData,
    },
  ] = useAddAddressMutation();

  useEffect(() => {
    if (createAddressIsSuccess) {
      dispatch(setAddressModalIsOpen(false));
      toast.success("Shipping Address Added.");
      reset();
    }

    if (createAddressIsError) {
      console.log(createAddressError);
    }
  }, [
    addressData,
    createAddressIsError,
    createAddressError,
    createAddressIsSuccess,
    reset,
    dispatch,
  ]);

  useEffect(() => {
    setValue("kabupaten");
    setValue("kecamatan");
    setValue("kelurahan");
  }, [setValue, allFields.provinsi]);

  useEffect(() => {
    setValue("kecamatan");
    setValue("kelurahan");
  }, [setValue, allFields.kabupaten]);

  useEffect(() => {
    setValue("kelurahan");
  }, [setValue, allFields.kecamatan]);

  const onSubmitHandler = (values) => {
    const payload = {
      name: values.nama_alamat,
      provinces: values.provinsi.label,
      regencies: values.kabupaten.label,
      districts: values.kecamatan.label,
      villages: values.kelurahan.label,
      details: values.detail_alamat,
    };

    createAddress(payload);
  };

  const bodyContent = (
    <div className="flex w-full flex-col gap-4">
      <Heading title="Welcome back!" subtitle="Glad to see you again.. :)" />

      <Input
        id="nama_alamat"
        label="Nama Alamat"
        register={register}
        errors={errors}
        required
      />

      <Input
        id="detail_alamat"
        label="Detail Alamat"
        register={register}
        errors={errors}
        required
      />

      <SelectWilayah
        tingkat="provinsi"
        name="provinsi"
        placeholder="Provinsi"
        control={control}
      />

      <SelectWilayah
        tingkat="kabupaten"
        kodeInduk={getValues()?.provinsi?.value}
        name="kabupaten"
        placeholder="Kabupaten"
        control={control}
        isDisabled={!getValues()?.provinsi?.value}
      />

      <SelectWilayah
        tingkat="kecamatan"
        kodeInduk={getValues()?.kabupaten?.value}
        name="kecamatan"
        placeholder="Kecamatan"
        control={control}
        isDisabled={!getValues()?.kabupaten?.value}
      />

      <SelectWilayah
        tingkat="kelurahan"
        kodeInduk={getValues()?.kecamatan?.value}
        name="kelurahan"
        placeholder="Kelurahan"
        control={control}
        isDisabled={!getValues()?.kecamatan?.value}
      />
    </div>
  );

  return (
    <Modal
      label="Add Shipping Address"
      isOpen={addressModalIsOpen}
      onClose={() => dispatch(setAddressModalIsOpen(false))}
      disabled={createAddressIsLoading}
      body={bodyContent}
      actionLabel="NEXT"
      onSubmit={handleSubmit(onSubmitHandler)}
    />
  );
};

export default AddressFormModal;
