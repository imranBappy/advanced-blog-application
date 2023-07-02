import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Profile = (props: any) => {
  const [showMenu, setShowMenu] = props.menu;

  const user: any = useSelector((state: any) => state?.auth?.user) || {};
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/do5erbtee/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688325761/thumbnail/url-1688325757974-profile-pic.png.jpeg.jpg?_s=public-apps";

  return (
    <>
      <div className="h-16 mt-3">
        <Image
          onClick={() => setShowMenu(!showMenu)}
          className="rounded-full ring-4 ring-blue-500 cursor-pointer"
          src={user.url || DEFAULT_AVATAR_URL}
          alt="profile"
          width={40}
          height={40}
        />
      </div>
      {showMenu && (
        <div className="absolute top-[67px] p-1 ring-1 ring-gray-400 w-36 right-0 z-50 shadow-2xl bg-[#fafafb] rounded-md ">
          <ul
            className="px-5 pt-4 pb-3"
            style={{ borderBottom: "1px solid #808080" }}
          >
            <li>
              <Link href={`/user/${user?._id}`}>Profile</Link>
            </li>
          </ul>
          <ul className="px-5 pb-5 pt-3">
            <li className=" mb-2">
              <Link href={`/dashboard`}>Dashboard</Link>
            </li>
            {user.role === "User" && (
              <li>
                <Link href={`/blog`}>Create Post</Link>
              </li>
            )}
          </ul>
          <ul
            className="px-5 pb-3 pt-3"
            style={{ borderTop: "1px solid #808080" }}
          >
            <li>
              <button onClick={props.handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Profile;
