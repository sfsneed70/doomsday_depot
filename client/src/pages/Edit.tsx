import BlogForm from "../components/BlogForm";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BLOG } from "../utils/queries";
import { EDIT_BLOG } from "../utils/mutations";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { blogId } = useParams();
  const { loading, data, error } = useQuery(GET_BLOG, {
    variables: { blogId },
  });
  const blog = data?.blog || {};
  const [editBlog] = useMutation(EDIT_BLOG);

  if (loading) {
    return <div>Loading...</div>;
  }

  const updateBlog = async (updatedBlog: {
    title: string;
    content: string;
  }) => {
    try {
      await editBlog({
        variables: {
          blogId,
          title: updatedBlog.title,
          content: updatedBlog.content,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="display-2">Edit Blog</h1>
      <BlogForm
        prevTitle={blog.title}
        prevContent={blog.content}
        onSubmitFn={updateBlog}
      />
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default Edit;
