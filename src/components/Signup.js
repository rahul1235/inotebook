import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    console.log(user);
    console.log("handleSignUp here");
    const host = "http://localhost:4000/";

    const loginUrl = `${host}api/auth/create-user`;
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...user }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.status === "SUCCESS") {
      localStorage.setItem("token", jsonResponse.data.authToken);
      console.log(jsonResponse);
      props.showAlert(`Welcome ${user.name}!`, "success");
      navigate("/");
    }else {
      console.log(props);
      console.log(jsonResponse.message);
      props.showAlert(jsonResponse.message, "danger");
    }
  };

  return (
    <div className="container">
      <h2>SignUp and use iNoteBook</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            onChange={onChange}
          />
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            onChange={onChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSignup}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
