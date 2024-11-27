import { useMutation } from "@apollo/client";
import { ADD_BLOG } from "../utils/mutations";
import BlogForm from "./BlogForm";

const AddBlog = () => {
  const [addBlog] = useMutation(ADD_BLOG);

  const createBlog = async (newBlog: { title: string; content: string }) => {
    try {
      await addBlog({ variables: { blogData: { ...newBlog } } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <BlogForm onSubmitFn={createBlog} />
    </div>
  );
};

export default AddBlog;
