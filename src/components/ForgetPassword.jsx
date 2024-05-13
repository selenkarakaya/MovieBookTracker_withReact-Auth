import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => setEmail(e.target.value);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast("Could not send reset email");
    }
  };
  return (
    <div className="form-container mx-auto">
      <header>
        <p className="fs-4 my-2 text-center font-mono">Forgot Password</p>
      </header>
      <form onSubmit={onSubmit} className="signForm">
        <div className="mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <button className="btn-sign px-2 py-1">Send Reset Link</button>

        <Link className="my-3 fst-italic" to="/signIn">
          Sign In
        </Link>
      </form>
    </div>
  );
}

export default ForgetPassword;
