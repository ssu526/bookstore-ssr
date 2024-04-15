import React, { useState } from "react";
import "../App.css";
import AddEditBookForm from "./AddEditBookForm.js";
import BookDetail from "./BookDetail.js";
import { useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice.js";

//const API_BASE_URL = "http://localhost:8000/api/v1";
const API_BASE_URL = "https://bookstore-blazesoft.onrender.com/api/v1";

function Home({ initialDataFromServer }) {
  const dispatch = useDispatch();
  const [books, setbooks] = useState(window && window.preloadedBooks);

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
        setbooks([...books, data]);
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
        setbooks(
          books.map((book) => {
            if (book.id === data.id) {
              return data;
            }
            return book;
          })
        );
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
        setbooks(books.filter((book) => book.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App container">
      <h1 className="title">Bookstore</h1>
      <button
        className="add-book-btn"
        onClick={() => dispatch(openModal(null))}
      >
        Add New Book
      </button>
      <div className="books-list">
        {initialDataFromServer
          ? initialDataFromServer.map((book) => (
              <BookDetail
                key={book.id}
                book={book}
                handleDelete={handleDelete}
              />
            ))
          : books &&
            books.map((book) => (
              <BookDetail
                key={book.id}
                book={book}
                handleDelete={handleDelete}
              />
            ))}
      </div>

      <AddEditBookForm handleAdd={handleAdd} handleEdit={handleEdit} />
    </div>
  );
}

export default Home;
