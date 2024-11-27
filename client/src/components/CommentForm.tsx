import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import { useState } from "react";

const CommentForm = ({ blogId }: { blogId: string | undefined }) => {
  const [comment, setComment] = useState<string>("");
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addComment({ variables: { blogId, comment } });
      setComment("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Add Your Comment</Form.Label>
        <Form.Control
          value={comment}
          as="textarea"
          rows={2}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error && <div className="text-danger pb-3"> {error.message}</div>}
    </Form>
  );
};

export default CommentForm;
