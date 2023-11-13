import React from "react";
import ai from '../../assets/ai.png';


class Home extends React.Component {

  render() {
    return (

      <div className="book_app__header section__padding" >
      <div className="book_app__header-content">
        <h1 className="gradient__text">Book App</h1>
        <p>          This full-stack web application is built using TypeScript and leverages MongoDB as its database, NestJS for the backend service, JWT authentication for user security, and React for the frontend. The application offers a comprehensive set of features, including user authentication, CRUD (Create, Read, Update, Delete) operations.</p>
      </div>
  
      <div className="book_app__header-image">
        <img src={ai} alt=""/>
      </div>
    </div>
    );
  }
}

export default Home;
