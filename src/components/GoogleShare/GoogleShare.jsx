import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

function ShareGoogle() {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        toast.success("Google login successful!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        navigate("/"); // Redirect to home or desired route
      })
      .catch((error) => {
        toast.error("Google login failed. Try again!", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        console.error(error.message);
      });
  };

  return (
    <div className="flex justify-center">
      <button onClick={handleGoogleLogin} className="btn px-14 text-2xl">
        <FcGoogle />
      </button>
    </div>
  );
}

export default ShareGoogle;

