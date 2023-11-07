import { Component, ChangeEvent } from "react";
import BookDataService from "../services/book.service";
import IBookData from '../types/book.type';

type Props = {};

type State = IBookData & {
  submitted: boolean
};

export default class AddBook extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

    this.state = {
      _id: null,
      title: "",
      description: "",
      price: 0,
      published: false,
      submitted: false
    };
  }

  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e: ChangeEvent<HTMLInputElement>) {
    const price = parseInt(e.target.value, 10);
    this.setState({ price: isNaN(price) ? 0 : price });
  }

  saveBook() {
    const data: IBookData = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price
    };

    BookDataService.create(data)
      .then((response: any) => {
        this.setState({
          _id: response.data._id,
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newBook() {
    this.setState({
      _id: null,
      title: "",
      description: "",
      price: 0,
      published: false,
      submitted: false
    });
  }

  render() {
    const { submitted, title, description, price } = this.state;

    return (
      <div className="standart-form">
          <h3>Add a New Book</h3>
        {submitted ? (
          <div className="submission-success">
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBook}>
              Add New Book
            </button>
          </div>
        ) : (
          <div className="submission-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                required
                value={price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>

            <button onClick={this.saveBook} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>

    );
  }
}
