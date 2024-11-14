import { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "./shared/OAuth";
import visibilityIcon from "../assets/visibilityIcon.svg";

function SignIn() {
  const auth = getAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        toast(` Hello ${auth.currentUser.displayName} 🌈🌸`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong 😥", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="">
      <header>
        <p className="fs-3 my-2 text-center font-mono">Welcome!</p>
        <p className="fs-6 text-center">Sign in & Enjoy it 💌 </p>
      </header>
      <form onSubmit={onSubmit} className="signForm form-container mx-auto">
        <div className="mb-2">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={onChange}
            data-testid="email-input"
          />
        </div>
        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={onChange}
            data-testid="password-input"
          />
          <img
            src={visibilityIcon}
            alt="show password"
            className="showPassword"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>

        <div className="d-flex my-4 justify-content-center">
          <div className="d-flex justify-content-center align-items-center w-100">
            <button className="p-2 btn-sign" data-testid="submit-button">
              Sign In
            </button>
            <span className="mx-2">or</span>
            <OAuth />
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-between form-container mx-auto">
        <Link to="/SignUp" className="m-2">
          Sign Up Instead
        </Link>
        <Link to="/ForgetPassword" className="m-2">
          Forgot Password
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
