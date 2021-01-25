import React, { Component } from "react";
import axios from "axios";
import GetBooks from "./GetBooks";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      query: "",
      books: [],
      message: "",
    };
    this.cancel = "";
  }

  fetchBooks = (query) => {
    if (this.cancel) {
      console.log("sssssssssss");
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();
    console.log(axios.CancelToken.source());
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`, {
        cancelToken: this.cancel.token,
      })
      .then((data) => {
        console.log(data.data.items);
        const resultNotFoundMsg = !data.data.items.length
          ? "try another search query"
          : "";
        this.setState({
          books: data.data.items,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "failed loooooding",
          });
        }
      });
  };

  handleInputChange = (e) => {
    const query = e.target.value;
    this.setState(
      {
        query,
        loading: true,
        message: "",
      },
      () => {
        this.fetchBooks(query);
      }
    );
  };

  render() {
    const { query } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="query"
            onChange={this.handleInputChange}
            placeholder="book title, author ..."
            value={query}
          />
          <i className="fas fa-search" />
        </form>
      </div>
    );
  }
}

export default SearchContainer;
