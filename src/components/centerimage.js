import React, { useState } from "react";
import Modal from "react-modal";
import "./centerimage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");
// Custom styles for the modal
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default function Centerimage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [book, setBook] = useState("");

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the form input value
    setModalIsOpen(false);
  };

  return (
    <div className="back">
      <div className="backmain">
        <h1 className="heading">SeekOut the book that seeks out to you</h1>
        <p className="para">
          An ebook (short for electronic book), also known as an e-book or eBook
        </p>
        <div className="ebtn">
          <button id="Ebtn" href="#" onClick={handleModalOpen}>
            explore
          </button>
        </div>
      </div>
      <div className="cover"></div>
      <div className="addDelete">
        <button className="addDeleteBtn1" onClick={handleModalOpen}>
          <FontAwesomeIcon icon={faPlus} /> ADD BOOK
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={modalStyles}
        contentLabel="Add Book Modal"
      >
        <h2>Add Book</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter book title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter book Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter book Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <input
            type="file"
            placeholder="Upload the Book"
            value={book}
            onChange={(e) => setBook(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
}
