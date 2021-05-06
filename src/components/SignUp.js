import React, { useState, useEffect } from "react";
import axios from "axios";

export const SignUp = (props) => {
  const [errMess, setErrMess] = useState(false);
  const [firstName, setFirstName] = useState(String);
  const [lastName, setLastName] = useState(String);
  const [usrName, setUsrName] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [message, setMessage] = useState(String);
  const [signedUpErr, setSignedUpErr] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const buttonStyle = {
    background: "#79aec8",
  };

  const errorStyle = {
    color: "#ff0000",
  };

  const frstName = (frstName) => {
    setFirstName(frstName);
  };

  const lsttName = (lstName) => {
    setLastName(lstName);
  };

  const userName = (userName) => {
    setUsrName(userName);
  };

  const passwd = (passwd) => {
    setPassword(passwd);
  };

  const chamgeEmail = (email) => {
    setErrMess(false);
    setEmail(email);
  };

  const validateEmail = (email) => {
    let regexPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let validate = email.match(regexPattern);

    if (!validate) {
      setErrMess(true);
    }
  };

  const onSignUp = (event) => {
    event.preventDefault();
    setShowLoader(true);
    let endpoints = props.endpoint === "fan" ? "fan" : "talent";
    if (
      firstName != "" &&
      lastName != "" &&
      usrName != "" &&
      email != "" &&
      password != "" &&
      !errMess
    ) {
      let body = {
        first_name: firstName,
        last_name: lastName,
        username: usrName,
        email: email,
        password: password,
        timezone: "America/New_York",
        captcha: true,
      };
      axios({
        method: "POST",
        url: `http://134.209.148.76:2000/api/v3/sign-up/${endpoints}`,
        headers: { "Content-Type": "application/json" },
        data: body,
      })
        .then((response) => {
          setShowLoader(false);
          if (response != null) {
            setSignedUpErr(false);
            setMessage("Signed Up successfully!");
          }
        })
        .catch(({ response }) => {
          setShowLoader(false);
          let email = response.data.data.email;
          let username = response.data.data.username;
          let errMessage =
            email && username
              ? `This email and username is already taken!`
              : email && !username
              ? `${email}`
              : username;
          setSignedUpErr(true);
          setMessage(errMessage);
        });
    } else {
      setShowLoader(false);
      setSignedUpErr(true);
      setMessage("Kindly fill all fields.");
    }
  };

  useEffect(() => {
    if(message) {
        setTimeout(() => {
            setSignedUpErr(false);
            setMessage('');
        }, 3000)
    }
  }, [message, signedUpErr])

  return (
    <form onSubmit={onSignUp}>
      <h3>{props.endpoint !== "fan" ? `Talent SignUp` : `Fan SignUp`}</h3>
      {message ? (
        <div class={signedUpErr ? `alert alert-danger` : `alert alert-success`}>
          <strong>{signedUpErr ? `Error!` : `Wooho!`}</strong> {message}
        </div>
      ) : (
        ""
      )}
      <div className="form-group">
        <label>First name: </label>
        <input
          id="first_name"
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => frstName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Last name: </label>
        <input
          id="last_name"
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => lsttName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>User name: </label>
        <input
          id="user_name"
          type="text"
          className="form-control"
          placeholder="User name"
          onChange={(e) => userName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email: </label>
        <input
          id="email"
          type="email"
          className="form-control"
          placeholder="example@email.com"
          onChange={(e) => chamgeEmail(e.target.value)}
          onBlur={(e) => validateEmail(e.target.value)}
        />
        {errMess && !message ? (
          <p style={errorStyle}>Kindly enter email address</p>
        ) : (
          ""
        )}
      </div>

      <div className="form-group">
        <label>Password: </label>
        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="Enter password"
          minLength={8}
          onChange={(e) => passwd(e.target.value)}
        />
      </div>

      <button
        style={buttonStyle}
        type="submit"
        className="btn btn-dark btn-lg btn-block"
      >
        {!showLoader ? (
          `Register`
        ) : (
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </button>
    </form>
  );
};

export default SignUp;
