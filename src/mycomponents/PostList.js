import React, { Component } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "../../node_modules/react-router-dom";
import ReactPaginate from "../../node_modules/react-paginate";
import axios from "../../node_modules/axios";
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      store: JSON.parse(localStorage.getItem("login")),
      offset: 0,
      perPage: 5,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.receivedData();
  }
  receivedData() {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts";
    axios.get(apiUrl).then((res) => {
      const data = res.data;
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((pd) => (
        <React.Fragment>
          <div key={pd.id} className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <Link to={"/details/" + pd.id}>
                    <img
                      className="img-fluid rounded"
                      src="http://placehold.it/750x300"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="col-lg-6">
                  <h2 className="card-title">{pd.title}</h2>
                  <p className="card-text">{pd.body}</p>
                  {this.state.store && this.state.store.login ? (
                    <Link to={"/details/" + pd.id} className="btn btn-primary">
                      Read More &rarr;
                    </Link>
                  ) : (
                    <Link to="/auth/login" className="btn btn-primary">
                      Read More &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              Posted on January 1, 2017 by
              <Link to="#" href="#">
                Start Bootstrap
              </Link>
            </div>
          </div>
        </React.Fragment>
      ));

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),

        postData,
      });
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };
  render() {
    return (
      <div>
        <Nav />
        <div className="container all-margin-top">
          <h1 className="mt-4 mb-3">
            Blog Home Two
            <small>Subheading</small>
          </h1>

          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/posts" href="index.html">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active">Blog Home 2</li>
          </ol>

          {/**Blog Post */}
          {this.state.postData}
          {/* Pagination */}
          
            
          <ul className="pagination justify-content-center mb-4">
          <ReactPaginate
                    previousLabel={"← Older"}
                    nextLabel={"Newer →"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}
export default PostList;
