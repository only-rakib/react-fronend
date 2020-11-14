import React, { Component } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "../../node_modules/react-router-dom";
class Post extends Component {
  constructor({ match }) {
    super();
    this.state = {
      id: match.params.data,
      postss: [],
      comments: [],
      store: JSON.parse(localStorage.getItem("login")),
    };
  }
  componentDidMount() {
    
    const apiUrl =
      "https://jsonplaceholder.typicode.com/posts/" + this.state.id;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ postss: json });
      });
    const cmntUrl = `https://jsonplaceholder.typicode.com/posts/${this.state.id}/comments`;
    fetch(cmntUrl)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ comments: json });
      });
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="container all-margin-top text-left">
          <h1 className="mt-4 mb-3">
            Post Title
            <small>
              by
              <Link to="#">Start Bootstrap</Link>
            </small>
          </h1>

          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/posts">Home</Link>
            </li>
            <li className="breadcrumb-item active">Blog Home 2</li>
          </ol>

          <div className="row">
            <div className="col-lg-8">
              <img
                className="img-fluid rounded"
                src="http://placehold.it/900x300"
                alt=""
              />

              <hr />

              <p>Posted on January 1, 2017 at 12:00 PM</p>

              <hr />

              <p className="lead">{this.state.postss.title}</p>

              <p>{this.state.postss.body}</p>

              <p>{this.state.postss.body}</p>

              <blockquote className="blockquote">
                <p className="mb-0">{this.state.postss.body}</p>
                <footer className="blockquote-footer">
                  {this.state.postss.body}
                  <cite title="Source Title">{this.state.postss.title}</cite>
                </footer>
              </blockquote>

              <p>{this.state.postss.body}</p>

              <p>{this.state.postss.body}</p>

              <hr />

              {/*Comments Form*/}
              <div className="card my-4">
                <h5 className="card-header">Leave a Comment:</h5>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              {/*Single Comment*/}
              {this.state.comments.map((cmnt) => (
                <div className="media mb-4" key={cmnt.id}>
                  <img
                    className="d-flex mr-3 rounded-circle"
                    src="http://placehold.it/50x50"
                    alt=""
                  />
                  <div className="media-body">
                    <h5 className="mt-0">{cmnt.name}</h5>
                    {cmnt.body}
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <h5 className="card-header">Search</h5>
                <div className="card-body">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for..."
                    />
                    <span className="inpug-group-append">
                      <button className="btn btn-secondary" type="button">
                        Go!
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <div className="card my-4">
                <h5 className="card-header">Categories</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <Link to="#">Web Design</Link>
                        </li>
                        <li>
                          <Link to="#">HTML</Link>
                        </li>
                        <li>
                          <Link to="#">Freebies</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <Link to="#">JavaScript</Link>
                        </li>
                        <li>
                          <Link to="#">CSS</Link>
                        </li>
                        <li>
                          <Link to="#">Tutorials</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card my-4">
                <h5 className="card-header">Side Widget</h5>
                <div className="card-body">
                  You can put anything you want inside of these side widgets.
                  They are easy to use, and feature the new Bootstrap 4 card
                  containers!
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
export default Post;
