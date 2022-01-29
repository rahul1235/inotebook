import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [creadintial, setCreadintial] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCreadintial({ ...creadintial, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    console.log(creadintial);
    console.log("handleLogin here");
    const host = "http://localhost:4000/";

    const loginUrl = `${host}api/auth/login`;
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...creadintial }),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.status === "SUCCESS") {
      localStorage.setItem("token", jsonResponse.data.authToken);
      console.log(jsonResponse);
      navigate("/");
      props.showAlert("Welcome! You are logged in", "success");
    } else {
      props.showAlert(jsonResponse.message, "danger");
    }
  };
  return (
    <div className="container">
      <h2>Login to continue to iNoteBook</h2>
      <form>
        <div className="mb-3">
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
            autoComplete={false}
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
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
