import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "./shared/OAuth";
import visibilityIcon from "../assets/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

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
      // create user
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      //ADD USER ON DATABASE
      // I don't want to change formData so  i copied it as formDataCopy.
      const formDataCopy = { ...formData };
      //Now, I don't want the password to get submitted to the database, so we'll take form data copy and what we can do is we can call delete.
      delete formDataCopy.password;
      //Once it's submitted or once it's added, then the server timestamp will get added to it.
      formDataCopy.timestamp = serverTimestamp();
      //setdoc is what is actually going to update the database and add our user to the users collection.
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      updateProfile(auth.currentUser, { displayName: name });
      //after sign up, redirect to home page
      toast("Welcome 💫🌻", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/SignIn");
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
    <div>
      <h4 className="text-center mb-4">Create an Account</h4>
      <form onSubmit={onSubmit} className="signForm form-container mx-auto">
        <div data-mdb-input-init className="form-outline mb-2">
          <input
            placeholder="Name"
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={name}
            onChange={onChange}
            data-testid="name-input"
          />
        </div>
        <div data-mdb-input-init className="form-outline mb-2">
          <input
            placeholder=" Email address"
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={onChange}
            data-testid="email-input"
          />
        </div>
        <div data-mdb-input-init className="form-outline passwordInputDiv">
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-control"
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
            <button className="p-2 btn-sign">Sign Up</button>
            <span className="mx-2">or</span>
            <OAuth />
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-between form-container mx-auto">
        <Link to="/SignIn" className="m-2">
          Sign In Instead
        </Link>
        <Link to="/ForgetPassword" className="m-2">
          Forgot Password
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
