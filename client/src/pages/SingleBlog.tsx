import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_BLOG } from "../utils/queries";
import Blog from "../components/Blog";
import { IBlog } from "../interfaces/Blog";
import CommentForm from "../components/CommentForm";

const SingleBlog = () => {
  const { blogId } = useParams();
  const { loading, data, error } = useQuery(GET_BLOG, {
    variables: { blogId: blogId },
  });
  const blog: IBlog = data?.blog || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Blog
        key={blog._id}
        username={blog.username}
        content={blog.content}
        dateCreated={blog.dateCreated}
        title={blog.title}
        _id={blog._id}
        commentCount={blog.commentCount}
      />
      <CommentForm blogId={blogId} />
      {blog.comments && blog.comments.length > 0 ? (
        <>
          <h6>Comments:</h6>
          {blog.comments &&
            blog.comments.map((comment) => (
              <>
                <hr />
                <div key={comment._id}>
                  <p>{comment.comment}</p>
                  <p>
                    By: {comment.username} on {comment.dateCreated}
                  </p>
                </div>
              </>
            ))}
        </>
      ) : (
        <h6>No comments yet!</h6>
      )}

      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default SingleBlog;
