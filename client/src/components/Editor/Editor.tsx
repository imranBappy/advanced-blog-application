import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import Thumbnail from "./Thumbnail";
import { usePostBlogMutation } from "@/features/blog/blogApi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });
export default function Editor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [thumbnail, setThumbnail] = useState<any>("");
  const [postBlog, { data, isLoading, isError, error }] = usePostBlogMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data || isError) {
      if (isError) toast.error("There was an error !");
      else {
        toast.success("Blog successfully published!");
        router.push("/");
      }
    }
  }, [data, isLoading, isError, error, dispatch, router]);

  const handlePost = async () => {
    if (!title) toast.error("Title is require");
    if (content.length < 12) toast.error("Content is require");

    if (title && content.length > 12) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("thumbnail", thumbnail);
      postBlog(formData);
    }
  };
  const [url, setUrl] = useState<any | null>(null);

  useEffect(() => {
    if (thumbnail) {
      setUrl(URL.createObjectURL(thumbnail));
    }
  }, [thumbnail]);

  return (
    <div className=" min-h-100 ">
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
          disabled={isLoading}
          className="btn-active btn-hover  my-5"
          onClick={handlePost}
        >
          {isLoading ? "Loading" : "Publish"}
        </button>
      </div>
    </div>
  );
}
