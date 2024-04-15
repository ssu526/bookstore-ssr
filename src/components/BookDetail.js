import React from "react";

const BookDetail = ({ book, openModal, handleDelete }) => {
  return (
    <div className="book-container">
      <div className="book-detail" onClick={() => openModal(book)}>
        <h3 className="book-name">{book.name}</h3>
        <p className="book-category">{book.category}</p>
        <p className="book-price">${book.price}</p>
      </div>
      <button className="delete-btn" onClick={() => handleDelete(book.id)}>
        Delete
      </button>
    </div>
  );
};

export default BookDetail;
