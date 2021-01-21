import React from "react";
import { useLocation, useParams } from "react-router";

const BookPage = () => {
  const book = useLocation().state.bookData;
  const bookId = useParams().id;

  return (
    <div>
      <h1>{book.title}</h1>
      <img
        src={book.imageLinks.thumbnail}
        alt="No thumbnail"
        width="200"
        height="300"
      />
    </div>
  );
};

export default BookPage;
