import React from "react";
import SearchCard from "./SearchCard";

const SearchList = (props) => {
  const booksArr = props.books.map((book, key) => {
    return <SearchCard key={key} book={book} />;
  });

  return <div>{booksArr}</div>;
};

export default SearchList;
