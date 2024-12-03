// import { Form, Button } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const BlogForm = ({
//   prevTitle = "",
//   prevContent = "",
//   onSubmitFn,
// }: {
//   prevTitle?: string;
//   prevContent?: string;
//   onSubmitFn: (blog: { title: string; content: string }) => Promise<void>;
// }) => {
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState({ title: prevTitle, content: prevContent });

//   useEffect(() => {
//     setBlog({ title: prevTitle, content: prevContent });
//   }, [prevTitle, prevContent]);

//   const handleFormSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       await onSubmitFn(blog);
//       setBlog({ title: "", content: "" });
//       navigate("/");
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <Form onSubmit={handleFormSubmit}>
//       <Form.Group>
//         <Form.Label>Title</Form.Label>
//         <Form.Control
//           value={blog.title}
//           as="input"
//           name="title"
//           onChange={(e) => setBlog({ ...blog, title: e.target.value })}
//         />
//       </Form.Group>
//       <Form.Group>
//         <Form.Label>Content</Form.Label>
//         <Form.Control
//           value={blog.content}
//           as="textarea"
//           name="content"
//           rows={2}
//           onChange={(e) => setBlog({ ...blog, content: e.target.value })}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default BlogForm;
