import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../provider/AuthProvider";

function SignIn() {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then(() => {
        toast.success("Login successful!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMsg = error.message.includes("auth")
          ? "Invalid email or password."
          : "An error occurred. Please try again.";
        toast.error(errorMsg, {
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-300">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="w-full max-w-md p-8 space-y-6  dark:shadow bg-white shadow-lg shadow-blue-200 rounded-lg">
        <h2 className="text-2xl  font-bold text-center text-gray-800">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block dark:text-white/70 mb-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 dark:text-white/70 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-[#4946EC] rounded-lg focus:ring-4 focus:ring-blue-300"
          >
            Sign in
          </button>
        </form>
        {/* Uncomment if needed */}
        {/* <ShareGoogle /> */}
        <p className="dark:text-gray-300">
          Not a member?{" "}
          <Link className="text-blue-400" to={`/signUp`}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
