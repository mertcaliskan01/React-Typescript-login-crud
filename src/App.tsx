import { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import './components/home/home.css';
import AuthService from "./services/auth.service";
import IUser from './types/user.type';
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home/home.component";
import Profile from "./components/profile/profile.component";
import AddBook from "./components/add-book.component";
import Book from "./components/book.component";
import BooksList from "./components/list/books-list.component";
import EventBus from "./common/EventBus";
import Navbar from "./components/navbar/navbar";
import Footer from "./containers/footer/footer";



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
      <div className="App">

        <div className="gradient__bg">
          <Navbar currentUser={currentUser} onLogout={this.logOut} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/list" component={BooksList} />
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

     
        <Footer />


        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;