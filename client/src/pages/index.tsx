import Blog from "@/components/Blog/Blog";
import Layout from "@/components/Layout/Layout";
import Error from "@/components/UI/Error";
import BlogLoader from "@/components/UI/loaders/BlogLoader";
import { blogApi, useGetBlogsQuery } from "@/features/blog/blogApi";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";

export default function Home() {
  const { data, isError, isLoading } = useGetBlogsQuery({});
  const { blogs, length } = data || { blogs: [], length: 0 };
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (blogs) {
      if (blogs.length === length && length > 1) setHasMore(false);
    }
  }, [blogs, length]);

  console.log({ blogs });

  useEffect(() => {
    if (page > 1) {
      dispatch(blogApi?.endpoints?.getMoreBlogs.initiate({ page }));
    }
    console.log("more");
  }, [page, dispatch]);

  let content = null;
  let loaddingComponents = (
    <>
      <BlogLoader />
      <BlogLoader />
      <BlogLoader />
    </>
  );
  if (isLoading) content = loaddingComponents;
  if (isError) content = <Error />;
  if (!blogs) content = loaddingComponents;
  if (blogs)
    content = blogs.map((blog: any) => <Blog key={blog._id} blog={blog} />);

  const handleFetchMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={length}
        next={handleFetchMore}
        hasMore={hasMore}
        endMessage={<p className="text-center py-3">There are not blog</p>}
        loader={
          <Layout>
            <div id="index-page" className="blog-container sm:px-3 mt-24">
              {loaddingComponents}
            </div>
          </Layout>
        }
      >
        <Layout>
          <div id="index-page" className="blog-container sm:px-3 mt-24">
            {content}
          </div>
        </Layout>
      </InfiniteScroll>
    </>
  );
}
