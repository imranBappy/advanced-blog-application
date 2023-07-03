import React from "react";
import Post from "../Post/Post";
import { useDashboardGetBlogQuery } from "@/features/dashboard/dashboardApi";
import Error from "../UI/Error";

const DashboardBlog = () => {
  const {
    data: blogs,
    isError,
    isLoading,
    error,
  } = useDashboardGetBlogQuery({});
  console.log(error, blogs);

  let content = null;
  if (isLoading)
    content = (
      <>
        <div>Loading......</div>
      </>
    );
  if (isError) content = <Error />;
  if (blogs)
    content = blogs.map((blog: any) => (
      <Post key={blog._id} _id={blog._id} title={blog.title} />
    ));

  return (
    <>
      <div className="container mb-20">
        <h3 className="py-3 font-bold text-xl">Posts</h3>

        <div className="flex flex-col flex-shrink gap-5">{content}</div>
      </div>
    </>
  );
};

export default DashboardBlog;
