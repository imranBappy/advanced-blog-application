import React from "react";
import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";
import useAuth from "@/hooks/useAuth";
import useAuthCheck from "@/hooks/useAuthCheck";
import { toast } from "react-toastify";
import { userLoggedOut } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  useAuthCheck();
  const isAuthenticated = useAuth();
  const [showMenu, setShowMenu] = React.useState(false);
  const dispatch = useDispatch();
  const user: any = useSelector((state: any) => state?.auth?.user) || {};

  const handleLogout = () => {
    if (localStorage.getItem("auth")) {
      toast.success("Successfully Logout!");
      localStorage.removeItem("auth");
      dispatch(userLoggedOut());
    }
  };
  return (
    <>
      <nav className=" z-50 h-16 border-b bg-white ring  ring-blue-500 top-0 drop-shadow-md fixed w-full">
        <div className="sm:container mx-auto flex justify-between ">
          <div className="h-16 flex items-center">
            <Link href={`/`}>
              <Image
                src="/logo.png"
                alt="Next.js Logo"
                height={80}
                width={150}
              />
            </Link>
          </div>
          <div className="flex gap-5">
            <ul className=" h-16 flex flex-wrap items-center gap-3 font-semibold">
              {!isAuthenticated && (
                <li className=" btn hidden sm:block">
                  <Link href={`/login`}>Login</Link>
                </li>
              )}
              <li className="btn-active btn-hover">
                {}
                <Link
                  href={
                    isAuthenticated
                      ? user.role === "Admin"
                        ? `/dashboard`
                        : `/blog`
                      : `/register`
                  }
                >
                  {isAuthenticated
                    ? user.role === "Admin"
                      ? "Dashboard"
                      : "Create Post"
                    : "Create Account"}
                </Link>
              </li>
            </ul>
            {isAuthenticated && (
              <div className="relative">
                <Profile
                  handleLogout={handleLogout}
                  menu={[showMenu, setShowMenu]}
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
