import React from "react";
import { useState } from "react";
import "./App.css";
import AddEditBookForm from "./components/AddEditBookForm";
import BookDetail from "./components/BookDetail";

const API_BASE_URL = "http://localhost:8000/api/v1";

function App({ initialDataFromServer }) {
  const [books, setBooks] = useState(window && window.preloadedBooks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setIsModalOpen(false);
  };

  const handleAdd = (newBook) => {
    fetch(`${API_BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setBooks([...books, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (updatedBook) => {
    fetch(`${API_BASE_URL}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        const updatedBooks = books.map((book) => {
          if (book.id === data.id) {
            return data;
          }
          return book;
        });
        setBooks(updatedBooks);
      });
  };

  const handleDelete = (id) => {
    fetch(`${API_BASE_URL}/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        const updatedBooks = books.filter((book) => book.id !== id);
        setBooks(updatedBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App container">
      <h1 className="title">Bookstore</h1>
      <button className="add-book-btn" onClick={() => openModal(null)}>
        Add New Book
      </button>
      <div className="books-list">
        {initialDataFromServer
          ? initialDataFromServer.map((book) => (
              <BookDetail
                key={book.id}
                book={book}
                openModal={openModal}
                handleDelete={handleDelete}
              />
            ))
          : books &&
            books.map((book) => (
              <BookDetail
                key={book.id}
                book={book}
                openModal={openModal}
                handleDelete={handleDelete}
              />
            ))}
      </div>

      <AddEditBookForm
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        book={selectedBook}
      />
    </div>
  );
}

export default App;
