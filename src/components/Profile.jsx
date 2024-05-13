import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";

function Profile() {
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const auth = getAuth();
  const [formData, setformData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    toast(` Goodbye ${auth.currentUser.displayName} 👋🏻`, {
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
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name on firebase
        await updateProfile(auth.currentUser, { displayName: name });
        //update on firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
      }
    } catch (error) {
      toast("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  if (auth.currentUser) {
    return (
      <div className="mb-5">
        <header className="d-flex ">
          <p className="pl-2 btn">My Account • </p>
          <p
            className="btn"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Done • " : "Change Details • "}
          </p>
          <button type="button" className="btn-logOut" onClick={onLogout}>
            Log out
            <FiLogOut style={{ color: "darkorchid", fontSize: "1.2rem" }} />
          </button>
        </header>
        <h4 className="text-center mb-2">My details</h4>
        <div className="form-container mx-auto my-4">
          <form className="signForm">
            <div className="">
              <label htmlFor="name" className="mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className={!changeDetails ? "profile" : "profileActive"}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="">
              <label htmlFor="email" className="mb-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className={!changeDetails ? "profile" : "profileActive"}
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/SignIn" replace={true} />;
  }
}

export default Profile;
