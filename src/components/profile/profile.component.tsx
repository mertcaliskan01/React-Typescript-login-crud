import { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import IUser from "../../types/user.type";
import ai from "../../assets/ai.png";

type Props = {};

type State = {
  redirect: string | null;
  currentUser: IUser & { token: string };
};
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      currentUser: { token: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const { currentUser } = this.state;

    return (
      <div className="book_app__header section__padding">
        <div className="book_app__header-content">
          <h1 className="gradient__text">
            {currentUser.firstName} {currentUser.lastName}
          </h1>

          <p>
            <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
            {currentUser.token.substr(currentUser.token.length - 20)}
          </p>
          <p>
            <strong>Name:</strong> {currentUser.firstName}
          </p>
          <p>
            <strong>Surname:</strong> {currentUser.lastName}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
        </div>

        <div className="book_app__header-image">
          <img 
            src={ai} 
            alt="" 
            loading="lazy"/>
        </div>
      </div>
    );
  }
}
