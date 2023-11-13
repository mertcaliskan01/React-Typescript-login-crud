import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from 'react-router-dom';
import AuthService from "../services/auth.service";
import registerImg from '../assets/logo.png';

type Props = {};

type State = {
  username: string,
  email: string,
  password: string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  validationSchema() {
    return Yup.object().shape({
      firstName: Yup.string()
        .test(
          "len",
          "The name must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("This field is required!"),
      lastName: Yup.string()
          .test(
            "len",
            "The name must be between 3 and 20 characters.",
            (val: any) =>
              val &&
              val.toString().length >= 3 &&
              val.toString().length <= 20
          )
          .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }

  handleRegister(formValue: { firstName: string; lastName: string; email: string; password: string }) {
    const { firstName, lastName, email, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      firstName,
      lastName,
      email,
      password
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
        
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    
    const { successful, message } = this.state;

    if (successful) {
      return <Redirect to="/login" />;
    }

    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    return (
      <div className="col-md-6 mx-auto">
        <div className="">
          <img
            src={registerImg}
            alt="register-img"
            className="auth-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>


                  <div className="row">
                    <div className="col">

                      <div className="form-group">
                        <label htmlFor="firstName"> First Name </label>
                        <Field name="firstName" type="text" className="form-control" />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="alert alert-danger"     
                        />
                      </div>
                    </div>

                    <div className="col">
                      <div className="form-group">
                        <label htmlFor="lastName"> Last Name </label>
                        <Field name="lastName" type="text" className="form-control" />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="alert alert-danger"
                        />
                      </div>
                    </div>
                </div>


                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
