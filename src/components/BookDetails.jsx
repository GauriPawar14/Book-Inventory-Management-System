// This component shows details of selected book
import React from "react";
function BookDetails({ book, onBack }) {
  const info = book.volumeInfo;

  return (
    <div>
      <h2>Book Details</h2>

      <p><b>Title:</b> {info.title}</p>
      <p><b>Author:</b> {info.authors?.join(", ")}</p>
      <p><b>Published Date:</b> {info.publishedDate}</p>
      <p><b>Publisher:</b> {info.publisher}</p>
      <p><b>Overview:</b> {info.description}</p>

      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default BookDetails;

