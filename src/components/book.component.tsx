import { Component, ChangeEvent } from "react";
import { RouteComponentProps, Link } from 'react-router-dom';

import BookDataService from "../services/book.service";
import IBookData from "../types/book.type";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
  currentBook: IBookData;
  message: string;
}

export default class Book extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateBook = this.updateBook.bind(this);

    this.state = {
      currentBook: {
        _id: null,
        title: "",
        description: "",
        price: 0,
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getBook(this.props.match.params.id);
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentBook: {
        ...prevState.currentBook,
        description: description,
      },
    }));
  }

  onChangePrice(e: ChangeEvent<HTMLInputElement>) {
    // We parse the user input as an integer
    const price = parseInt(e.target.value, 10);
  
    // Update the price value based on whether the conversion is successful
    this.setState((prevState) => ({
      currentBook: {
        ...prevState.currentBook,
        price: isNaN(price) ? 0 : price,
      },
    }));
  }
  

  getBook(id: string) {
    BookDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentBook: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updatePublished(status: boolean) {
    this.setState(function (prevState) {
      return {
        currentBook: {
          ...prevState.currentBook,
          published: status,
        },
      };
    });
  }

  

  updateBook() {
    BookDataService.update(
      this.state.currentBook,
      this.state.currentBook._id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The book was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }


  render() {
    const { currentBook } = this.state;

    return (
<div className="col-md-6 mx-auto">
  {currentBook ? (
    <div className="standart-form">
        <div className="book_app__header-content">
          <h1 className="list-heading gradient__text ">Add a New Book</h1>
        </div>

      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={currentBook.title}
            onChange={this.onChangeTitle}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={currentBook.description}
            onChange={this.onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            value={currentBook.price}
            onChange={this.onChangePrice}
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <span className={currentBook.published ? "published" : "pending"}>
            {currentBook.published ? "Published" : "Pending"}
          </span>
        </div>

        <div className="button-group">
          {currentBook.published ? (
            <button
              type="button" // Bu satırı ekleyin
              className="btn btn-warning"
              onClick={() => this.updatePublished(false)}
            >
              Unpublish
            </button>
          ) : (
            <button
              type="button" // Bu satırı ekleyin
              className="btn btn-primary"
              onClick={() => this.updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button
            type="submit"
            className="btn btn-success "
            onClick={this.updateBook}
          >
            Update
          </button>
        </div>
        <p className="message">{this.state.message}</p>
      </form>
    </div>
  ) : (
    <div className="submission-success">
      <h4>You submitted successfully!</h4>

      <Link to={"/home"} className="btn btn-success">
        Navigate To List
      </Link>
  </div>
  )}
</div>


    );
  }
}
