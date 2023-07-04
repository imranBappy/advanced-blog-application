import Blog from "@/components/Blog/Blog";
import Layout from "@/components/Layout/Layout";
import Error from "@/components/UI/Error";
import BlogLoader from "@/components/UI/loaders/BlogLoader";
import { useGetBlogsQuery } from "@/features/blog/blogApi";

export default function Home() {
  const { data: blogs, isError, isLoading } = useGetBlogsQuery({});
  let content = null;

  if (isLoading)
    content = (
      <>
        <BlogLoader />
        <BlogLoader />
        <BlogLoader />
      </>
    );
  if (isError) content = <Error />;
  if (!blogs)
    content = (
      <>
        <BlogLoader />
        <BlogLoader />
        <BlogLoader />
      </>
    );
  if (blogs)
    content = blogs.map((blog: any) => <Blog key={blog._id} blog={blog} />);
  return (
    <>
      <Layout>
        <div className="blog-container mt-24">{content}</div>
      </Layout>
    </>
  );
}
