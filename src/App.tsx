import { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import AddBook from "./components/add-book.component";
import Book from "./components/book.component";
import BooksList from "./components/books-list.component";


import EventBus from "./common/EventBus";

type Props = {};

type State = {
  isUserLoggedIn: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      isUserLoggedIn: true,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        isUserLoggedIn: true,
        currentUser: user
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser} = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Todo App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
    
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.firstName} {currentUser.lastName}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={BooksList} />
            <Route exact path="/add" component={AddBook} />
            <Route path="/books/:id" component={Book} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />

            <Route
              path="/login"
              render={() => ( this.state.isUserLoggedIn ? <Redirect to="/register" /> : <Login />)}
            />

          </Switch>

      
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;