import React from "react";
import { openModal } from "../slices/modalSlice.js";
import { useDispatch } from "react-redux";

const BookDetail = ({ book, handleDelete }) => {
  const dispatch = useDispatch();

  return (
    <div className="book-container">
      <div className="book-detail" onClick={() => dispatch(openModal(book))}>
        <h3 className="book-name">{book.name}</h3>
        <p className="book-category">{book.category}</p>
        <p className="book-price">${parseFloat(book.price).toFixed(2)}</p>
      </div>
      <button className="delete-btn" onClick={() => handleDelete(book.id)}>
        Delete
      </button>
    </div>
  );
};

export default BookDetail;
