import { useContext } from "react";
import { Helmet } from "react-helmet";
// import { AuthContext } from "../../provider/AuthPorvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import ShareGoogle from "../GoogleShare/GoogleShare";
// import ShareGoogle from "../../components/ShareGoogle/ShareGoogle";

function SignUp() {
  const navigate = useNavigate();
  // const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const result = await createUser(data.email, data.password);
      console.log(result.message);
  
      await updateUserProfile(data.name, data.photoURL);
  
      // No Axios call here anymore

      toast.success("Registration successful!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
  
      navigate("/");
    } catch (error) {
      console.error(error.message);
  
      toast.error(error.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="bg-white dark:bg-slate-700 p-8 rounded-xl shadow-xl dark:shadow shadow-blue-200 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6 animate-fadeIn">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white font-semibold mb-2">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.name && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white font-semibold mb-2">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.email && <span className="text-red-500">This field is required</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-white font-semibold mb-2">
              Upload Photo URL
            </label>
            <input
              {...register("photoURL", { required: true })}
              type="text"
              placeholder="Enter your Photo URL"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.photoURL && <span className="text-red-500">This field is required</span>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white font-semibold mb-2">
              Password
            </label>
            <input
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/,
              })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 dark:text-white"
            />
            {errors.password?.type === "required" && <span className="text-red-500">Password is required!</span>}
            {errors.password?.type === "minLength" && <span className="text-red-500">Password must be at least 6 characters long!</span>}
            {errors.password?.type === "maxLength" && <span className="text-red-500">Password cannot exceed 20 characters!</span>}
            {errors.password?.type === "pattern" && <span className="text-red-500">Password must include uppercase, lowercase, a number, and a special character!</span>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#4946EC] text-white py-2 rounded-lg hover:bg-[#4a47f7] transition-all duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        
        <div className="divider dark:text-white">Or</div>
        <ShareGoogle />

        <p className="text-gray-600 dark:text-white text-center mt-4">
          Already have an account?{" "}
          <Link className="text-blue-400 dark:text-blue-300" to="/SignIn">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
