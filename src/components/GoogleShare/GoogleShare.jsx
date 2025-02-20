// import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { AuthContext } from "../../provider/AuthProvider";

function ShareGoogle() {
  // const { googleLogin } = useContext(AuthContext);


  return (
    <div className="flex justify-center">
      <button  className="btn px-14 text-2xl">
        <FcGoogle />
      </button>
    </div>
  );
}

export default ShareGoogle;
