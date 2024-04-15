import React, { useEffect, useState } from "react";

const AddEditBookForm = ({
  isModalOpen,
  closeModal,
  handleAdd,
  handleEdit,
  book,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [inputError, setInputError] = useState("");

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
      price.trim === "" ||
      category.trim === "" ||
      description.trim() === ""
    ) {
      setInputError("All fields are required.");
      return;
    }

    if (book) {
      handleEdit({ ...book, name, price, category, description });
    } else {
      handleAdd({ name, price, category, description });
    }

    resetForm();
    closeModal();
  };

  const handleCancel = () => {
    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
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
            onChange={(e) => setName(e.target.value)}
            placeholder="Name*"
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price*"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category*"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
