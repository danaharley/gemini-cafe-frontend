import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../../../components/Avatar";
import MenuItem from "../../../components/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginModalIsOpen,
  setRegisterModalIsOpen,
} from "../modal/modalSlice";
import { logout } from "../auth/authSlice";
import { useLogoutMutation } from "../auth/authApiSlice";
import { toast } from "react-hot-toast";
import { clearUser } from "./userSlice";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ currentUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.persistedReducer.user);

  const [
    logoutFn,
    {
      isError: logoutIsError,
      error: logoutError,
      isSuccess: logoutIsSuccess,
      data: logoutData,
    },
  ] = useLogoutMutation();

  useEffect(() => {
    if (logoutIsSuccess) {
      dispatch(logout());
      dispatch(clearUser());
      console.log(logoutData);
      toast.success(logoutData?.message);
    }

    if (logoutIsError) {
      console.log(logoutError);
      toast.error(logoutError?.data?.message);
    }
  }, [logoutIsError, logoutError, logoutIsSuccess, dispatch, logoutData]);

  const logoutHandler = () => {
    logoutFn();
  };

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden text-sm font-semibold md:block">
          {currentUser && user?.fullname}
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-2 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar imgSrc={"/nubicoder.png"} alt={"nubicoder"} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-11/12">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => navigate("/orders")}
                  label="My Orders"
                />
                <hr />
                <MenuItem onClick={logoutHandler} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => dispatch(setLoginModalIsOpen(true))}
                  label="Login"
                />
                <MenuItem
                  onClick={() => dispatch(setRegisterModalIsOpen(true))}
                  label="Register"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
