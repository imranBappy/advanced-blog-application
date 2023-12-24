import React from "react";
import Post from "../Post/Post";
import { useDashboardGetBlogQuery } from "@/features/dashboard/dashboardApi";
import Error from "../UI/Error";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const DashboardBlog = () => {
  const [page, setPage] = React.useState(1);
  const { data, isError, isLoading } = useDashboardGetBlogQuery({ page: page });
  const { blogs, length } = data || { blogs: [], length: 0 };
  let content = null;
  if (isLoading)
    content = (
      <>
        <div>Loading......</div>
      </>
    );
  if (isError) content = <Error />;
  if (data)
    content = blogs.map((blog: any) => (
      <Post key={blog._id} _id={blog._id} title={blog.title} />
    ));

  const handlePage = (page: number) => {
    console.log(page);

    setPage(page);
  };
  return (
    <>
      <div className="container mb-20">
        <h3 className="py-3 font-bold text-xl">Posts</h3>

        <div className="flex flex-col flex-shrink gap-5">{content}</div>
        {/* pagination bar */}
        <div className="flex justify-between dark:bg-dark2  mx-5 py-5 dark:text-dark4">
          <div>Page : {page}</div>
          <div>
            <div className="flex  items-center text-xl gap-5">
              <span
                onClick={() => (page > 1 ? handlePage(page - 1) : {})}
                className="icon_btn"
              >
                <IoIosArrowBack />
              </span>
              <span
                onClick={() => (length / 5 > page ? handlePage(page + 1) : {})}
                className="icon_btn"
              >
                <IoIosArrowForward />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardBlog;
