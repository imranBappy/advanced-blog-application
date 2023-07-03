import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Thumbnail from "./Thumbnail";
import {
  useGetBlogQuery,
  useUpdateBlogMutation,
} from "@/features/blog/blogApi";
import { useRouter } from "next/router";
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

  const [thumbnail, setThumbnail] = useState<any>(null);
  const [url, setUrl] = useState<any>(null);

  useEffect(() => {
    if (thumbnail) setUrl(URL.createObjectURL(thumbnail));
  }, [thumbnail]);

  useEffect(() => {
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
  }, [data, updateLoading, updateError, error, isError, router]);

  const handlePost = async () => {
    if (!title) toast.error("Title is require");
    if (content.length < 12) toast.error("Content is require");

    if (title && content.length > 12) {
      const formData: any = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("content", content);
      updateBlog({ body: formData, id: id });
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
            value={content}
            onChange={setContent}
          />

          <div>
            <br />
            <button
              disabled={updateLoading}
              className="btn-active btn-hover  my-5"
              onClick={handlePost}
            >
              {updateLoading ? "Loading" : "Update"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
