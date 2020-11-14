import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Nav";
import Footer from "./Footer";
import { Redirect } from "../../node_modules/react-router-dom";
import className from "../../node_modules/classnames";
class Login extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      email: null,
      password: null,
      login: false,
      store: null,
      passwordError: true,
      emailError: true,
      emailMgs: "",
      passMgs: "",
    };
  }
  componentDidMount() {
    const user = localStorage.getItem("login"); // your saved token in localstorage
    if (user && user !== "undefined") {
      // check for not undefined
      this.props.history.push("/"); // now you can redirect your desired route
    }
  }
  onChangeHandler = (event) => {
    var inputName = event.target.name;
    var inputValue = event.target.value;
    this.setState({
      [inputName]: inputValue,
    });
    if (inputName === "email") {
      if (!this.emailValidation(inputValue)) {
        this.setState({
          emailMgs: "* Invalid Email",
          emailError: false,
        });
      } else {
        this.setState({
          emailMgs: "",
          emailError: true,
        });
      }
    }
  };
  loginButtonPressed() {
    if (this.state.emailError) {
      this.login();
    }
  }
  emailValidation(email) {
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return re.test(String(email).toLowerCase());
  }
  login() {
    var formdata = new FormData();
    formdata.append("email", this.state.email);
    formdata.append("password", this.state.password);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("https://exampleblogforgrayit.herokuapp.com/api/token/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.access) {
          //console.warn("results", result);
          localStorage.setItem(
            "login",
            JSON.stringify({
              login: true,
              store: result.access,
              email: this.state.email,
            })
          );
          console.log("ok");
          this.setState({ login: true });
        } else {
          alert("Username or password incorrect");
        }
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="container all-margin-top minimum-height">
          <div className="mt-5"></div>
          <h1 className="mt-5 mb-3 text-left">
            Login
            <small> Form</small>
          </h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Login</li>
          </ol>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <form name="sentMessage" id="contactForm" className="text-left">
                <div className="control-group form-group">
                  <div className="controls">
                    <label>Email*</label>
                    <input
                      type="email"
                      className={className(
                        "form-control",
                        !this.state.emailError && "is-invalid"
                      )}
                      id="email"
                      name="email"
                      onChange={this.onChangeHandler}
                    ></input>
                    <small className="invalid_input">
                      {this.state.emailMgs}
                    </small>
                  </div>
                </div>
                <div className="control-group form-group">
                  <div className="controls">
                    <label>Password*</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={this.onChangeHandler}
                    ></input>
                  </div>
                </div>
                <div id="success"></div>

                <button
                  type="button"
                  onClick={() => {
                    this.loginButtonPressed();
                  }}
                  className="btn btn-primary"
                  id="login-btn"
                >
                  Login
                </button>
                {this.state.login ? <Redirect to="/posts" /> : <div></div>}
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Login;
