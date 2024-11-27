import { useQuery } from "@apollo/client";
import { GET_BLOGS } from "../utils/queries";
import Blog from "./Blog";
import type { IBlog } from "../interfaces/Blog";

const BlogList = () => {
  // cache policy makes a new blog appear immediately no reload
  const { loading, data, error } = useQuery(GET_BLOGS, {
    fetchPolicy: "cache-and-network",
  });

  const blogs = data?.blogs || [];
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {blogs &&
        blogs.map((blog: IBlog) => (
          <div key={blog._id}>
            <Blog
              username={blog.username}
              content={blog.content}
              dateCreated={blog.dateCreated}
              title={blog.title}
              _id={blog._id}
              commentCount={blog.commentCount}
            />
            <hr />
          </div>
        ))}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default BlogList;
