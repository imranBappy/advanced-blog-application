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

const Profile = () => {
  const { name }: any = useSelector((state: any) => state?.auth?.user) || {};

  return (
    <PrivateRoute>
      <Layout>
        <div className=" -mt-4">
          <div className=" w-full h-40 bg-blue-900"></div>
          <div className="shadow-xl ring-1 ring-gray-400 px-5 pb-5 rounded blog-container -mt-16 mb-10 bg-white">
            <div className=" w-full flex justify-center ">
              <Image
                src={"/imran.png"}
                className="rounded-full -mt-14 ring-4 ring-blue-900"
                alt="profile"
                width={120}
                height={120}
              />
            </div>
            <div>
              <h1 className="text-center mt-3 text-2xl font-bold">{name}</h1>
              <p className="text-center text-md mt-1">Full Stack Developer</p>
            </div>
            <div className="my-3">
              <ul className="flex flex-wrap gap-5">
                <li className="flex items-center gap-2">
                  <IoLocationSharp /> <span>Khulna, Bangladesh</span>
                </li>
                <li className="flex items-center gap-2">
                  <MdEmail />
                  <span>imranbappy.official@gmail.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaExternalLinkAlt />
                  <span>https://imranbappy.me</span>
                </li>
                <li className="flex items-center gap-2">
                  <a href="https://github.com/imranBappy">
                    <AiOutlineGithub />
                  </a>
                </li>
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
