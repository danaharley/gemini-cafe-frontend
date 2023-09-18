import React, { useCallback, useEffect } from "react";
import Heading from "../../../components/Heading";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginModalIsOpen,
  setRegisterModalIsOpen,
} from "../modal/modalSlice";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import { toast } from "react-hot-toast";

const LoginFormModal = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { loginModalIsOpen } = useSelector((state) => state.globalModal);

  const [
    loginFn,
    {
      isLoading: loginIsLoading,
      isError: loginIsError,
      error: loginError,
      isSuccess: loginIsSuccess,
      data: loginData,
    },
  ] = useLoginMutation();

  useEffect(() => {
    if (loginIsSuccess) {
      dispatch(setCredentials(loginData));
      toast.success(loginData?.message);
      reset();
      dispatch(setLoginModalIsOpen(false));
    }

    if (loginIsError) {
      toast.error(loginError?.data?.message);
    }
  }, [
    loginIsError,
    loginError?.data?.message,
    loginIsSuccess,
    loginData,
    dispatch,
    reset,
  ]);

  const toggleModalAuth = useCallback(() => {
    dispatch(setLoginModalIsOpen(false));
    dispatch(setRegisterModalIsOpen(true));
  }, [dispatch]);

  const onSubmitHandler = (data) => {
    loginFn(data);
  };

  const bodyContent = (
    <div className="flex w-full flex-col gap-4">
      <Heading title="Welcome back!" subtitle="Glad to see you again.. :)" />
      <Input
        id="email"
        label="Email"
        disabled={loginIsLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={loginIsLoading}
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
          <div>Don't have an account?</div>
          <div
            onClick={toggleModalAuth}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Create an account.
          </div>
        </div>
      </div>
    </>
  );
  return (
    <Modal
      label="Login"
      isOpen={loginModalIsOpen}
      disabled={loginIsLoading}
      onClose={() => dispatch(setLoginModalIsOpen(false))}
      body={bodyContent}
      footer={footerContent}
      actionLabel="CONTINUE"
      onSubmit={handleSubmit(onSubmitHandler)}
    />
  );
};

export default LoginFormModal;
