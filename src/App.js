import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "../node_modules/react-router-dom";
import Login from "./mycomponents/Login";
import Register from "./mycomponents/Register";
//import Nav from "./mycomponents/Nav";
//import Footer from "./mycomponents/Footer";
import PostList from "./mycomponents/PostList";
import Post from "./mycomponents/Post";
import Protected from "./mycomponents/Protected";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/posts" />
            </Route>
            <Route exact path="/posts" component={PostList} />
            <Protected exact path="/details/:data" component={Post} />
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
