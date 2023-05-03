import Image from "next/image";
import Link from "next/link";
import React from "react";
const url = "http://localhost:5000";

const Blog = (props: any) => {
  const { title, thumbnail, content, author, _id } = props.blog;
  const dataUrl = `data:${thumbnail.contentType};base64,${btoa(
    new Uint8Array(thumbnail.data.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  )}`;

  return (
    <div className="card-blog mb-5">
      <Link href={`/blog/${_id}`}>
        {thumbnail && (
          <div>
            <Image
              className="rounded-t-lg"
              src={dataUrl}
              alt="Next.js Logo"
              width={800}
              height={500}
            />
          </div>
        )}

        <div className="p-5">
          <h2 className=" text-2xl font-semibold py-2">{title}</h2>
          <p className="pb-3">{content}</p>
          <div className="flex gap-3 items-center">
            <div>
              <Image
                src="/logo.svg"
                alt="Next.js Logo"
                width={50}
                height={50}
              />
            </div>
            <span> | </span>
            <div> March 31, 2023</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Blog;
