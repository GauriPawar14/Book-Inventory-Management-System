import React, { useState } from "react";
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";

function App() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div>
      <h1>Book Inventory Management System</h1>

      {selectedBook === null ? (
        <BookList onSelectBook={setSelectedBook} />
      ) : (
        <BookDetails
          book={selectedBook}
          onBack={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default App;

