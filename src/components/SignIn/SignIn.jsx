import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import ShareGoogle from "../GoogleShare/GoogleShare";
import { AuthContext } from "../../provider/AuthProvider";

function SignUp() {
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Creating user with email and password
      await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);
      
      reset();
      toast.success("Registration successful! Redirecting...", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input {...register("name", { required: true })} type="text" placeholder="Enter your name" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EC7C0E]" />
            {errors.name && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input {...register("email", { required: true })} type="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EC7C0E]" />
            {errors.email && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Photo URL</label>
            <input {...register("photoURL", { required: true })} type="text" placeholder="Enter your Photo URL" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EC7C0E]" />
            {errors.photoURL && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/ })} type="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EC7C0E]" />
            {errors.password && <span className="text-red-500">Invalid password format!</span>}
          </div>
          <button type="submit" className="w-full bg-[#EC7C0E] text-white py-2 rounded-lg hover:bg-orange-600 transition-all">Sign Up</button>
        </form>
        <div className="text-center my-4 text-gray-600">Or</div>
        <ShareGoogle />
        <p className="text-center mt-4">
          Already have an account? <Link className="text-[#EC7C0E]" to="/SignIn">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
