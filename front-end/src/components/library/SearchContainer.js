import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchList from "./SearchList";

const SearchContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const fetchBooks = (query) => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((data) => {
        console.log(data.data.items);
        const resultNotFoundMsg = !data.data.items.length
          ? "try another search query"
          : "";
        setBooks([...data.data.items]);
        setMessage(resultNotFoundMsg);
        setLoading(false);
      })
      .catch((error) => {
        console.log("errrrrrrror");
        if (error) {
          setLoading(false);
          setMessage("failed loooooding");
          console.log(error);
        }
      });
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    if (!query) {
      console.log("NOT QUERY");
      setQuery(query);
      setBooks([]);
      setMessage("");
    } else {
      console.log("QUERY ONNNN");
      setQuery(query);
      setLoading(true);
      setMessage("");
    }
  };

  useEffect(() => {
    if (query) {
      fetchBooks(query);
    }
  }, [query]);

  return (
    <div>
      <form>
        <input
          type="text"
          name="query"
          onChange={handleInputChange}
          placeholder="book title, author ..."
          value={query}
        />
        <i className="fas fa-search" />
        <SearchList books={books} />
      </form>
    </div>
  );
};

export default SearchContainer;
