import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const BookCard = (props) => {
  const bookData = props.book.volumeInfo;
  if (bookData.hasOwnProperty("publishedDate") === false) {
    bookData["publishedDate"] = "0000";
  }
  if (bookData.hasOwnProperty("imageLinks") === false) {
    bookData["imageLinks"] = {
      thumbnail:
        "https://storage.googleapis.com/stateless-muslimdc-asia/raudhah-grocer/2020/08/89c7e887-no_image_available.jpg",
    };
  }

  return (
    <div>
      <Link
        to={{
          pathname: `/book-page/${props.book.id}`,
          state: { from: "library", bookData },
        }}
      >
        <img
          src={bookData.imageLinks.thumbnail}
          alt="No thumbnail"
          width="130"
          height="200"
        />
      </Link>
      <p> {bookData.title}</p>
    </div>
  );
};

export default BookCard;
