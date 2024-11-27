import { Button } from "react-bootstrap";
import BlogList from "../components/BlogList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h5 className="display-2">Latest Blogs....</h5>
      <Button className="m-4" onClick={() => navigate("/profile")}>
        Add a Blog
      </Button>
      <BlogList />
    </div>
  );
};

export default Home;
