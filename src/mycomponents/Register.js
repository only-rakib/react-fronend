import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import className from "../../node_modules/classnames";
import Footer from "./Footer";
import Nav from "./Nav";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      confirm_pass: null,
      first_nameMgs: "",
      last_nameMgs: "",
      emailMgs: "",
      passwordMgs: "",
      confirm_passMgs: "",
      first_nameError: "",
      last_nameError: "",
      emailError: "",
      passwordError: "",
      confirm_passError: "",
      
    };
  }
  componentDidMount() {
    const user = localStorage.getItem("login"); // your saved token in localstorage
    if (user && user !== "undefined") {
      // check for not undefined
      this.props.history.push("/"); // now you can redirect your desired route
    }
  }
  registerButtonPressed() {
    if (
      this.state.first_nameError &&
      this.state.last_nameError &&
      this.state.emailError &&
      this.state.passwordError &&
      this.state.confirm_passError
    ) {
      this.register();
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

    if (inputName === "password") {
      if (!this.passwordValidation(inputValue)) {
        this.setState({
          passwordMgs:
            "* minimum 6 character at least one number and  one special character",
          passwordError: false,
        });
      } else {
        this.setState({
          passwordMgs: "",
          passwordError: true,
        });
      }
    }
    if (inputName === "confirm_pass") {
      if (inputValue !== this.state.password) {
        console.log(this.state.password, inputValue);
        this.setState({
          confirm_passMgs: "* Password not matched",
          confirm_passError: false,
        });
      } else {
        this.setState({
          confirm_passMgs: "",
          confirm_passError: true,
        });
      }
    }
    if (inputName === "first_name") {
      if (!this.nameValidation(inputValue)) {
        this.setState({
          first_nameMgs: "* Invalid name ( Name only contains A-Z and a-z)",
          first_nameError: false,
        });
      } else {
        this.setState({
          first_nameMgs: "",
          first_nameError: true,
        });
      }
    }
    if (inputName === "last_name") {
      if (!this.nameValidation(inputValue)) {
        this.setState({
          last_nameMgs: "* Invalid name ( Name only contains A-Z and a-z)",
          last_nameError: false,
        });
      } else {
        this.setState({
          last_nameMgs: "",
          last_nameError: true,
        });
      }
    }
  };
  emailValidation(email) {
    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return re.test(String(email).toLowerCase());
  }
  nameValidation(name) {
    var regex = /^[a-zA-Z ]{2,30}$/;
    return regex.test(String(name));
  }
  passwordValidation(pass) {
    var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(String(pass));
  }
  register() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("first_name", this.state.first_name);
    urlencoded.append("last_name", this.state.last_name);
    urlencoded.append("email", this.state.email);
    urlencoded.append("password", this.state.password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://exampleblogforgrayit.herokuapp.com/api/auth/register/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.first_name && result.last_name && result.email) {
          alert("Registration Success")
          
        }
        else
        {
          alert("Registration Failed")
        }
      })
      .catch((error) => console.log("error", error));
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="container all-margin-top text-left minimum-height">
          <h1 className="mt-4 mb-3">
            Register
            <small> Form</small>
          </h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">Register</li>
          </ol>

          <div className="row">
            <div className="col-lg-4 mb-4">
              
              <form name="sentMessage" id="contactForm">
                <div className="control-group form-group">
                  <div className="controls">
                    <label>First Name*</label>
                    <input
                      type="text"
                      className={className(
                        "form-control",
                        !this.state.first_nameError && "is-invalid"
                      )}
                      id="first_name"
                      name="first_name"
                      required
                      data-validation-required-message="Please enter your first name."
                      onChange={this.onChangeHandler}
                    ></input>
                    <small className="invalid_input">
                      {this.state.first_nameMgs}
                    </small>
                  </div>
                </div>
                <div className="controls">
                  <label>Last Name*</label>
                  <input
                    type="text"
                    className={className(
                      "form-control",
                      !this.state.last_nameError && "is-invalid"
                    )}
                    id="last_name"
                    name="last_name"
                    required
                    data-validation-required-message="Please enter your last name."
                    onChange={this.onChangeHandler}
                  ></input>
                  <small className="invalid_input">
                    {this.state.last_nameMgs}
                  </small>
                </div>
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
                      required
                      data-validation-required-message="Please enter your email."
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
                      className={className(
                        "form-control",
                        !this.state.passwordError && "is-invalid"
                      )}
                      id="password"
                      name="password"
                      onChange={this.onChangeHandler}
                    ></input>
                    <small className="invalid_input">
                      {this.state.passwordMgs}
                    </small>
                  </div>
                </div>
                <div className="control-group form-group">
                  <div className="controls">
                    <label>Confirm Password*</label>
                    <input
                      type="password"
                      className={className(
                        "form-control",
                        !this.state.confirm_passError && "is-invalid"
                      )}
                      name="confirm_pass"
                      id="confirm_pass"
                      onChange={this.onChangeHandler}
                    ></input>
                    <small className="invalid_input">
                      {this.state.confirm_passMgs}
                    </small>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    this.registerButtonPressed();
                  }}
                  className="btn btn-primary"
                  id="login-btn"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Register;
