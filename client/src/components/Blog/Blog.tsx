import Image from "next/image";
import Link from "next/link";
import React from "react";
const url = "http://localhost:5000";

const Blog = (props: any) => {
  const { title, thumbnail, content, author, _id } = props.blog;
  console.log(thumbnail, author);

  return (
    <div className="card-blog mb-5">
      <Link href={`/blog/${_id}`}>
        {thumbnail && (
          <div>
            <Image
              className="rounded-t-lg"
              src={`${thumbnail}`}
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
                className="rounded-full shadow-xl ring-2 ring-blue-500 cursor-pointer"
                src={author.url}
                alt="Next.js Logo"
                width={40}
                height={40}
              />
            </div>
            <span>
              {" "}
              <strong> {author.name}</strong> |{" "}
            </span>
            <div> March 31, 2023</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Blog;
