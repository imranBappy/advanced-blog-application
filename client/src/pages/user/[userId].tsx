import Layout from "@/components/Layout/Layout";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiOutlineGithub } from "react-icons/ai";
import DashboardBlog from "@/components/Blog/DashboardBlog";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Link from "next/link";
import { useRouter } from "next/router";

const Profile = () => {
  const { name, email, url, bio, address, website, github }: any =
    useSelector((state: any) => state?.auth?.user) || {};
  const router = useRouter();
  const DEFAULT_AVATAR_URL =
    "https://res.cloudinary.com/do5erbtee/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1688325761/thumbnail/url-1688325757974-profile-pic.png.jpeg.jpg?_s=public-apps";

  return (
    <PrivateRoute>
      <Layout>
        <div className=" -mt-4">
          <div className=" w-full h-40 bg-blue-900"></div>
          <div className=" relative shadow-xl ring-1 ring-gray-400 px-5 pb-5 rounded blog-container -mt-16 mb-10 bg-white">
            <div className=" absolute right-0 m-3">
              <Link href={`/user/update/${router?.query?.userId}`}>
                <button className=" btn h-10 active">Edit Profile</button>
              </Link>
            </div>

            <div className=" w-full flex justify-center ">
              <Image
                src={url || DEFAULT_AVATAR_URL}
                className="rounded-full -mt-14 ring-4 ring-blue-900"
                alt="profile"
                width={120}
                height={120}
              />
            </div>

            <div>
              <h1 className="text-center mt-3 text-2xl font-bold">{name}</h1>
              {bio && <p className="text-center text-md mt-1">{bio}</p>}
            </div>

            <div className="my-3">
              <ul className="flex flex-wrap gap-5  justify-center">
                {address && (
                  <li className="flex items-center gap-2">
                    <IoLocationSharp /> <span>{address}</span>
                  </li>
                )}

                <li className="flex items-center gap-2">
                  <MdEmail />
                  <span>{email}</span>
                </li>

                {website && (
                  <li className="flex items-center gap-2">
                    <a href={website}>
                      <FaExternalLinkAlt />
                    </a>
                    <span>{website}</span>
                  </li>
                )}

                {website && (
                  <li className="flex items-center gap-2">
                    <a href={github}>
                      <AiOutlineGithub />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <>
          <DashboardBlog />
        </>
      </Layout>
    </PrivateRoute>
  );
};

export default Profile;
