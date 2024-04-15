import React, { useEffect, useState } from "react";
import { closeModal } from "../slices/modalSlice.js";
import { useSelector, useDispatch } from "react-redux";

const AddEditBookForm = ({ handleAdd, handleEdit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [inputError, setInputError] = useState("");

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const book = useSelector((state) => state.modal.selectedBook);

  useEffect(() => {
    if (book !== null) {
      setName(book.name);
      setPrice(book.price);
      setCategory(book.category);
      setDescription(book.description);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      price.trim() === "" ||
      category.trim() === "" ||
      description.trim() === ""
    ) {
      setInputError("All fields are required.");
      return;
    }

    if (isNaN(Number(price.trim()))) {
      setInputError("Book price must be a number.");
      return;
    }

    if (book) {
      handleEdit({ ...book, name, price, category, description });
    } else {
      handleAdd({ name, price, category, description });
    }

    resetForm();
    dispatch(closeModal());
  };

  const handleCancel = () => {
    resetForm();
    dispatch(closeModal());
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setInputError("");
  };

  return (
    <div className={`modal-container ${isModalOpen ? "" : "hide"}`}>
      <div className="modal">
        <h1 className="form-title">{book ? "Edit " : "Add "} Book</h1>
        <p className="errormessage">{inputError}</p>
        <form className="add-edit-form">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setInputError("");
              setName(e.target.value);
            }}
            placeholder="Name*"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => {
              setInputError("");
              setPrice(e.target.value);
            }}
            placeholder="Price*"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => {
              setInputError("");
              setCategory(e.target.value);
            }}
            placeholder="Category*"
          />
          <textarea
            value={description}
            onChange={(e) => {
              setInputError("");
              setDescription(e.target.value);
            }}
            placeholder="Description*"
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            {book ? "Save" : "Add"}
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddEditBookForm;
