import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Thumbnail from "./Thumbnail";
import {
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "@/features/blog/blogApi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });
export default function UpdateBlog(props: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const { data: blog, isError, isLoading } = useGetBlogQuery(id);
  const [
    updateBlog,
    { data, isLoading: updateLoading, isError: updateError, error },
  ] = useUpdateBlogMutation();

  const [, setThumbnail] = useState("");
  const [url, setUrl] = useState(null);

  useEffect(() => {
    console.log(blog);
    if (blog && !isError && !isLoading) {
      setTitle(blog.title);
      setContent(blog.content);
      if (blog.thumbnail) setUrl(`${blog.thumbnail}`);
    }
  }, [blog, isError, isLoading]);
  useEffect(() => {
    if (isError) toast.error("There was an error !");
    if (data) {
      toast.success("Blog successfully Updated!");
      router.push("/");
    }
  }, [data, updateLoading, updateError, error]);

  const handlePost = async () => {
    if (!title) toast.error("Title is require");
    if (content.length < 12) toast.error("Content is require");

    if (title && content.length > 12) {
      updateBlog({ body: { title, content }, id: id });
      // console.log({ body: { title, content }, id: id });
    }
  };

  return (
    <div className=" min-h-100 ">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Thumbnail url={url} setThumbnail={setThumbnail} />
          <div className="my-5">
            <input
              className="w-full p-2 text-2xl font-bold"
              type="text"
              placeholder="New blog title here..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <ReactQuill
            placeholder="Write description"
            theme="snow"
            name="content"
            value={content}
            placeholder="Write your blog content here..."
            onChange={setContent}
          />

          <div>
            <br />
            <button
              disabled={isLoading}
              className="btn-active btn-hover  my-5"
              onClick={handlePost}
            >
              {isLoading ? "Loading" : "Update"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
