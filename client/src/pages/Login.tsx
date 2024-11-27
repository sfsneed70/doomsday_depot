import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
const Login = () => {
  return (
    <div>
      <h1 className="display-2">Login</h1>
      <div className="mb-5">
        {" "}
        <LoginForm />
      </div>

      <h2>Register a new account: </h2>
      <RegisterForm />
    </div>
  );
};

export default Login;
