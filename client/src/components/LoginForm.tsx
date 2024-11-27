import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { useLoggedIn } from "../App";

const LoginForm = () => {
  const [_loggedIn, setLoggedIn] = useLoggedIn();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formData } });
      Auth.login(data.login.token);
      setLoggedIn(true);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={formData.email}
          as="input"
          name="email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={formData.password}
          as="input"
          name="password"
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      {error && <div className="text-danger pb-3"> {error.message}</div>}
    </Form>
  );
};

export default LoginForm;
