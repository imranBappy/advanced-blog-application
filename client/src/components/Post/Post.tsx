import { useDeleteBlogMutation } from "@/features/blog/blogApi";
import Link from "next/link";
import React from "react";
import { AiFillLike } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Post = (props: any) => {
  const { title, _id } = props;
  const [deleteBlog, { data, isLoading, isError, error }] =
    useDeleteBlogMutation();
  useEffect(() => {
    if (isError) toast.error("There was an error");
    if (data) {
      toast.success("Successfully Deleted!");
    }
  }, [data, isLoading, isError, error]);
  const handleDelete = () => {
    deleteBlog(_id);
  };
  return (
    <div className=" w-full flex justify-between min-h-[120px] ring-1 shadow-md ring-gray-400 p-5 rounded ">
      <div className=" flex flex-col justify-between">
        <h3 className=" text-2xl font-bold">
          <Link href={`/blog/${_id}`}>{title}</Link>
        </h3>
        <p className=" text-gray-700">
          <strong>Published</strong> : Apr 3
        </p>
      </div>
      <div className=" flex items-center basis-16 justify-center">
        <div className=" flex flex-col gap-4">
          <AiFillLike />
          <IoEyeSharp />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 items-center basis-40">
        <button
          className="btn-active btn-hover h-10"
          disabled={isLoading}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="btn-active btn-hover h-10">
          <Link href={`/blog/edit/${_id}`}>Edit</Link>
        </button>
      </div>
    </div>
  );
};

export default Post;
