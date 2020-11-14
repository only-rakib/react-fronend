import React, { Component } from "react";
//import Login from "./Login";
//import Register from "./Register";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

//import PostList from "./PostList";
import { Link } from "../../node_modules/react-router-dom";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      login: false,
    };
  }
  componentDidMount() {
    this.storeCollector();
  }
  storeCollector() {
    let store = JSON.parse(localStorage.getItem("login"));

    if (store && store.login) {
      this.setState({
        email: store.email,
        login: true,
      });
    }
  }
  logout = () => {
    localStorage.removeItem("login");
    window.location.reload();
  };
  render() {
    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link to="/posts" className="navbar-brand">
            Example Blog
          </Link>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {this.state.login ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/posts">
                    {this.state.email}
                  </Link>
                </li>
              ) : (
                <li></li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/posts">
                  Posts
                </Link>
              </li>
              {this.state.login ? (
                <li className="nav-item">
                  <div onClick={this.logout} className="nav-link cursor">
                    Logout
                  </div>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/auth/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/auth/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default Nav;
