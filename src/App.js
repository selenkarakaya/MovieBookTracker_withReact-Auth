import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ForgetPassword from "./components/ForgetPassword";
import PrivateRoute from "./components/shared/PrivateRoute";
function App() {
  return (
    <>
      {" "}
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/Profile" element={<PrivateRoute />}>
              <Route path="/Profile" element={<Profile />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </main>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
