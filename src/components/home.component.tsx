import React from "react";

class Home extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="profile-container">
          <header className="profile-header">
            <h3>Welcome!</h3>
          </header>
          <div className="profile-details">
          <div className="main-content">
          <h4>About the Application:</h4>
          <p>
          This full-stack web application is built using TypeScript and leverages MongoDB as its database, NestJS for the backend service, JWT authentication for user security, and React for the frontend. The application offers a comprehensive set of features, including user authentication, CRUD (Create, Read, Update, Delete) operations.
          </p>
        </div>
        <div className="features">
          <h4>Application Features:</h4>
          <ul>
            <li>User Authentication: Users can register and log in to access their accounts, ensuring data security and personalization.</li>
            <li>CRUD Operations: The application offers Create, Read, Update, and Delete operations, allowing users to manage and manipulate data efficiently.</li>
            <li>Data Management: MongoDB is used to store and manage various types of data, making it suitable for a wide range of applications.</li>
            <li>Modern UI: The user interface, built with React and TypeScript, provides a modern and responsive design, enhancing the user experience.</li>
          </ul>
        </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
