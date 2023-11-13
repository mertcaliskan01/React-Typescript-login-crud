import { Component, ChangeEvent } from "react";
import BookDataService from "../../services/book.service";
import { Redirect, Link } from "react-router-dom";
import IBookData from "../../types/book.type";
import AuthService from "../../services/auth.service";
import IUser from "../../types/user.type";

type Props = {};

type State = {
  redirect: string | null;
  books: Array<IBookData>;
  searchTitle: string;
  currentUser: IUser & { token: string };
};

export default class BooksList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveBooks = this.retrieveBooks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.removeAllBooks = this.removeAllBooks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      redirect: null,
      currentUser: { token: "" },
      books: [],
      searchTitle: "",
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/login" });
    this.setState({ currentUser: currentUser });

    this.retrieveBooks();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveBooks() {
    BookDataService.getAll()
      .then((response: any) => {
        this.setState({
          books: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBooks();
  }

  removeAllBooks() {
    BookDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchTitle() {
    BookDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          books: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  deleteBook(bookId : any) {    
    BookDataService.delete(bookId)
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
      
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { searchTitle, books } = this.state;

    return (
      <div className="list-container">
        <div className="col-md-12 col-sm-12">
          <div className="book_app__header-content">
            <h1 className="list-heading gradient__text">Book List</h1>

            <div className="input-group">
              <div className="book_app__header-content__input">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
                />
                <button
                    className="btn btn-success search-button"
                    type="button"
                    onClick={this.searchTitle}
                  >
                    Search
                  </button>

                  <button
                    className="btn btn-danger remove-button"
                    onClick={this.removeAllBooks}
                  >
                    Remove All
                  </button>
              </div>
            </div>
          </div>
          <div className="table-container">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books &&
                  books.map((book: IBookData, index: number) => (
                    <tr key={index} className="table-row">
                      <td>{book.title}</td>
                      <td>{book.description}</td>
                      <td>{book.price}</td>
                      <td>{book.published ? "Published" : "Pending"}</td>
                      <td className="list-button-group">
                        <Link
                          to={"/books/" + book._id}
                          className="btn btn-warning"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => this.deleteBook(book._id)}
                          >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
