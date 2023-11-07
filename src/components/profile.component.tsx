import { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";

type Props = {};

type State = {
  redirect: string | null,
  currentUser: IUser & { token: string }
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      currentUser: { token: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser } = this.state;

    return (
      <div className="container">
        <div className="profile-container">
          <header className="profile-header">
            <h3>
              <strong>{currentUser.firstName} {currentUser.lastName}</strong>
            </h3>
          </header>
          <div className="profile-details">
            <div className="profile-item">
              <strong>Token:</strong>{" "}
              {currentUser.token.substring(0, 20)} ...{" "}
              {currentUser.token.substr(currentUser.token.length - 20)}
            </div>
            <div className="profile-item">
              <strong>Name:</strong>{" "}
              {currentUser.firstName}
            </div>
            <div className="profile-item">
              <strong>Surname:</strong>{" "}
              {currentUser.lastName}
            </div>
            <div className="profile-item">
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </div>
          </div>
        </div>
      </div>

    );
  }
}
