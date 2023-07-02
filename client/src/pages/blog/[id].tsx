import Layout from "@/components/Layout/Layout";
import { useGetBlogQuery } from "@/features/blog/blogApi";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import LoadingBar from "react-top-loading-bar";
import SingleBlogLoader from "@/components/UI/loaders/SingleBlogLoader";
import Error from "@/components/UI/Error";
import SingleBlog from "@/components/Blog/SingleBlog";
import Comments from "@/components/Comments/Comments";
import CommentBox from "@/components/Comments/CommentBox";
const getDocHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
};

export default function Blog() {
  const router = useRouter();
  const { id } = router.query;
  const [progress, setProgress] = useState(0);
  const { data: blog, isError, isLoading } = useGetBlogQuery(id);
  let content = null;
  if (isLoading)
    content = (
      <>
        <SingleBlogLoader />
        <SingleBlogLoader />
        <SingleBlogLoader />
      </>
    );

  if (isError) content = <Error />;
  if (blog) content = <SingleBlog blog={blog} />;
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const winHeight = window.innerHeight;
    const docHeight = getDocHeight();
    const totalDocScrollLength = docHeight - winHeight;
    const scrollPostion = Math.floor((scrollTop / totalDocScrollLength) * 100);
    setProgress(scrollPostion);
  };
  useEffect(() => {
    document.addEventListener("scroll", () => {
      handleScroll();
    });
  }, [progress]);

  return (
    <>
      <Layout>
        <div>
          <LoadingBar
            color="#3B82F6"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            height={3}
            loaderSpeed={500}
            waitingTime={300}
          />
        </div>
        <div className="blog-container">
          {content}
          <hr />
          <Comments blog={blog} />
        </div>
      </Layout>
    </>
  );
}
