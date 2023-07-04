import Image from "next/image";
import Link from "next/link";
import React from "react";
import moment from "moment/moment";

const Comment = (props: any) => {
  const {
    body,
    createdAt,
    user: { name, url },
  } = props.comment;

  const data = new Date(createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  var time = new Date(createdAt).toLocaleTimeString();
  // console.log(props.comment);

  return (
    <div className="flex gap-2">
      <div className="mt-2">
        <Link href={"#"}>
          <Image
            className="rounded-full shadow-xl ring-2 ring-blue-500 cursor-pointer"
            src={url || process.env.DEFAULT_AVATAR_URL}
            alt="profile"
            width={30}
            height={30}
          />
        </Link>
      </div>
      <div className="flex-grow shadow ring-1 ring-gray-400 p-5 mb-5 rounded ">
        <div className="flex items-center">
          <Link href={`#`}>
            <h5 className="my-1">
              <strong>{name}</strong>
            </h5>
          </Link>
          &nbsp; <b>.</b> &nbsp;
          <span className=" text-sm">{`${moment(createdAt).fromNow()}`}</span>
        </div>
        {body}
      </div>
    </div>
  );
};

export default Comment;
