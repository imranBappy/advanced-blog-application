import React, { useState } from "react";

import Editor from "@/components/Editor/UpdateBlog";
import Layout from "@/components/Layout/Layout";
export default function Main() {
  const [value, setValue] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const handlePost = () => {
    setIsPublished((prev) => !prev);
  };
  console.log(value);

  return (
    <>
      <Layout>
        <div className="container">
          <button onClick={handlePost} className="btn-active hover-btn my-5">
            Post
          </button>
          <h1>Post Blog</h1>
          {isPublished ? (
            <div>
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          ) : (
            <Editor state={[value, setValue]} />
          )}
        </div>
      </Layout>
    </>
  );
}
