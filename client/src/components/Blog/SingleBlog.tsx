import Image from "next/image";
import React from "react";
const url = "http://localhost:5000";

const SingleBlog = (props: any) => {
  const { title, thumbnail, content } = props.blog;
  return (
    <div>
      {thumbnail && (
        <div>
          <Image
            className="rounded-t-lg"
            src={`${url}${thumbnail}`}
            alt="Next.js Logo"
            width={800}
            height={500}
          />
        </div>
      )}

      <h1 className=" text-3xl font-bold my-5">{title}</h1>
      <div className="mb-10">
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
};

export default SingleBlog;
