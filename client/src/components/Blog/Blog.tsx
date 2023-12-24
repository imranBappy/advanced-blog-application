import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blog = (props: any) => {
  const { title, thumbnail, content, author, _id, createdAt } = props.blog;

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
              height={300}
              style={{
                height:400
              }}
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
                src={author.url || '/default.png'}
                alt="Next.js Logo"
                width={40}
                height={40}
                style={{
                  width:"40px",
                  height:"40px"
                }}
              />
            </div>
            <span>
              <strong> {author.name}</strong> |
            </span>
            <div> {moment(createdAt).fromNow()}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Blog;
