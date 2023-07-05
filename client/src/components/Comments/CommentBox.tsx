import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const CommentBox = (props: any) => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const isLogin = useAuth();
  const handleSubmit = (e: any) => {
    if (isLogin) {
      e.preventDefault();
      props.postComment({ body: comment, blogId: id });
      setComment("");
    } else router.push("/login");
  };

  const handleChange = (e: any) => {
    if (!isLogin) router.push("/login");
    else setComment(e.target.value);
  };
  return (
    <div className="flex gap-2 mt-10">
      <div className="mt-2">
        <Link href={"#"}>
          <Image
            className="rounded-full shadow-xl ring-2 ring-blue-500 cursor-pointer"
            src={props.url}
            alt="profile"
            width={30}
            height={30}
          />
        </Link>
      </div>
      <div className="flex-grow shadow ring-1 ring-gray-400 p-5 mb-5 rounded ">
        <form onSubmit={handleSubmit}>
          <div className="w-full px-3 mt-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor={"comment"}
            >
              Comment Box
            </label>
            <input
              value={comment}
              onChange={handleChange}
              required={true}
              placeholder="Write you comment..."
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
            <div className="w-full  mb-6 md:mb-0 mt-3">
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              />
            </div>
            {/* <p className="text-red-500 text-xs italic">{error.message}</p> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentBox;
