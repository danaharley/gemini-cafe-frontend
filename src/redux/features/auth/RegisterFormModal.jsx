import React, { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Heading from "../../../components/Heading";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import {
  setLoginModalIsOpen,
  setRegisterModalIsOpen,
} from "../modal/modalSlice";
import { useRegisterMutation } from "./authApiSlice";

const RegisterFormModal = () => {
  const dispatch = useDispatch();

  const { registerModalIsOpen } = useSelector((state) => state.globalModal);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [
    registerFn,
    {
      isLoading: registerIsLoading,
      isError: registerIsError,
      error: registerError,
      isSuccess: registerIsSuccess,
      data: registerData,
    },
  ] = useRegisterMutation();

  useEffect(() => {
    if (registerIsSuccess) {
      toast.success(registerData?.message);
      reset();
      dispatch(setRegisterModalIsOpen(false));
      dispatch(setLoginModalIsOpen(true));
    }

    if (registerIsError) {
      Object.values(registerError.data.fields).map((el) =>
        toast.error(el.message)
      );
    }
  }, [
    registerIsError,
    registerError?.data?.fields,
    registerIsSuccess,
    registerData?.message,
    reset,
    dispatch,
  ]);

  const toggleModalAuth = useCallback(() => {
    dispatch(setRegisterModalIsOpen(false));
    dispatch(setLoginModalIsOpen(true));
  }, [dispatch]);

  const onSubmitHandler = (data) => {
    registerFn(data);
  };

  const bodyContent = (
    <div className="flex w-full flex-col gap-4">
      <Heading title="Welcome to Gemini Cafe" subtitle="Create an account!" />
      <Input
        id="fullname"
        label="Fullname"
        disabled={registerIsLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="email"
        label="Email"
        disabled={registerIsLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={registerIsLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="passwordConfirm"
        label="Confirm Password"
        type="password"
        disabled={registerIsLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <>
      <hr className="mt-4" />
      <div className="mt-4 font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggleModalAuth}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Login to your an account.
          </div>
        </div>
      </div>
    </>
  );
  return (
    <Modal
      label="Register"
      isOpen={registerModalIsOpen}
      disabled={registerIsLoading}
      onClose={() => dispatch(setRegisterModalIsOpen(false))}
      body={bodyContent}
      footer={footerContent}
      actionLabel="CONTINUE"
      onSubmit={handleSubmit(onSubmitHandler)}
    />
  );
};

export default RegisterFormModal;
