import React, { useState, useEffect,useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/user";
function Login(props) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const [passErr, setPassErr] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      navigate("/dashboard");
    }
  }, [login]);

  const handleChange = async (event) => {
    let eventValue = event.target.value;

    setEmail(eventValue);
    if (!eventValue) {
      setEmail(eventValue);
      setEmailErr("Please enter email");
      return false;
    }
  };
  const handlePassword = async (event) => {
    let eventValue = event.target.value;
    setPassword(eventValue);

    if (!eventValue) {
      setPassword(eventValue);
      setPassErr("Please enter password");
      return false;
    }
    setPassword(eventValue);
    setPassErr("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let LoginData = {
      email,
      password,

    };

    const result = await loginAdmin(LoginData);
    if (result.status === false) {
      toast.dismiss();
      toast.error(result.message);
      return;
    }
    if (result.status === true) {
      console.log(result.data);
      let token = result.data.access_token;
      localStorage.setItem("jwtToken", token);
      toast.success("Login Successfully");
      login();
      setTimeout(function () {
        navigate("/dashboard");
      }, 3000);
      return false;
    }
    // });
  };

  return (
    <div className="login d-flex nm-aic nm-vh-md-100">
      <div className="overlay" />
      <div className="nm-tm-wr">
        <div className="container">
          <form>
            <div className="nm-hr nm-up-rl-3 text-center mb-4">
            <img src="assets/images/logo.svg" alt="" className="login_logo" />
            </div>
            <div className="form-group nm-gp">
              <span className="nm-gp-pp">
                <iconify-icon icon="ph:user-duotone"></iconify-icon>
              </span>
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                value={email}
                placeholder="Enter email"
                onChange={handleChange}
              />
              <p style={{ color: "red" }}>{emailErr}</p>
            </div>
            <div className="form-group nm-gp">
              <span className="nm-gp-pp">
                <iconify-icon icon="material-symbols:lock"></iconify-icon>
              </span>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                value={password}
                placeholder="Password"
                onChange={handlePassword}
              />{" "}
              <p style={{ color: "red" }}>{passErr}</p>
            </div>
            <div className="form-group nm-gp">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label
                  className="form-check-label nm-check"
                  htmlFor="rememberMe"
                >
                  Keep me logged in
                </label>
              </div>
            </div>
            <div className="  nm-aic nm-mb-1">
              <div className="  nm-mb-1 nm-mb-sm-0">
                <button
                  type="submit"
                  className="btn btn-primary nm-hvr nm-btn-2 w100"
                  onClick={handleSubmit}
                >
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
