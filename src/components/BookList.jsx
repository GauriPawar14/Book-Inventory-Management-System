import React, { useEffect, useState } from "react";
function BookList({ onSelectBook }) {
  const [books, setBooks] = useState([]);

  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // API call to fetch books
  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=javascript")
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
        }
      });
  }, []);

  // CREATE & UPDATE
  const handleSubmit = () => {
    if (title === "" || author === "") {
      alert("Please enter both title and author");
      return;
    }

    if (editIndex === null) {
      // CREATE
      const newBook = {
        volumeInfo: {
          title,
          authors: [author],
          publishedDate: "N/A",
          publisher: "Manual Entry",
          description: "Added manually",
        },
      };
      setBooks([...books, newBook]);
    } else {
      // UPDATE
      const updated = [...books];
      updated[editIndex].volumeInfo.title = title;
      updated[editIndex].volumeInfo.authors = [author];
      setBooks(updated);
      setEditIndex(null);
    }

    setTitle("");
    setAuthor("");
  };

  // DELETE
  const deleteBook = (index) => {
    const updated = books.filter((_, i) => i !== index);
    setBooks(updated);
  };

  // LOAD DATA FOR EDIT
  const editBook = (book, index) => {
    setTitle(book.volumeInfo.title || "");
    setAuthor(book.volumeInfo.authors?.[0] || "");
    setEditIndex(index);
  };

  return (
    <div>
      <h2>Book Inventory</h2>

      {/* CREATE / UPDATE FORM */}
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editIndex === null ? "Add Book" : "Update Book"}
      </button>

      <hr />

      {/* READ: Table with scroll */}
      <div style={{ height: "300px", overflowY: "scroll" }}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.volumeInfo.title}</td>
                <td>{book.volumeInfo.authors?.[0]}</td>
                <td>
                  <button onClick={() => onSelectBook(book)}>
                    View
                  </button>{" "}
                  <button onClick={() => editBook(book, index)}>
                    Edit
                  </button>{" "}
                  <button onClick={() => deleteBook(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
