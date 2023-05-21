import React, { useState } from "react";
import Modal from "react-modal";
import "./centerimage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

Modal.setAppElement("#root");
// Custom styles for the modal
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff2277",
  }
};

export default function Centerimage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [book, setBook] = useState({ preview: "", data: "" });

  const handleModalOpen = () => {
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (e) => {
    const book = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setBook(book);
  };
  const appSetting = {
    databaseURL:
      "https://bookies-387406-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };
  const app = initializeApp(appSetting);
  const database = getDatabase(app);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const description = e.target[1].value;
    const rating = e.target[2].value;

    const formData = new FormData();
    console.log(e.target[3].files[0]);
    formData.append("file", e.target[3].files[0]);
    formData.append("upload_preset", "bookstore");
    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const { name, id, webContentLink, webViewLink } = data;

      const bookDetails = ref(database, id);
      push(bookDetails, {
        title: name,
        id: id,
        download_link: webContentLink,
        view_link: webViewLink,
        description: description,
        rating: rating,
      });
      // console.log(name, id, webContentLink, webViewLink,description,rating);
    } catch (error) {
      console.log("An error occurred while uploading the file:", error.message);
    }

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
        <form onSubmit={handleFormSubmit} id="addfunction">
          <input
            style={{
              outline: "none",
              position: "absolute",
              left: "40px",
              border: "2px solid ",
              height: "20px",
              backgroundColor: "#fff",
              fontFamily: "Bebas Neue",
              width: "70%",
            }}
            type="text"
            placeholder="Enter book title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            style={{
              outline: "none",
              position: "absolute",
              left: "40px",
              border: "2px solid ",
              height: "20px",
              backgroundColor: "#fff",
              fontFamily: "Bebas Neue",
              width: "70%",
            }}
            type="text"
            placeholder="Enter book Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br></br>
          <br></br>
          <input
            style={{
              outline: "none",
              position: "absolute",
              left: "40px",
              border: "2px solid ",
              height: "20px",
              backgroundColor: "#fff",
              fontFamily: "Bebas Neue",
              width: "70%",
            }}
            type="text"
            placeholder="Enter book Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <br></br>
          <br></br>
          <input type="file" name="file" onChange={handleFileChange} />
          <button type="submit" id="subbtn">Submit</button>
        </form>
      </Modal>
    </div>
  );
}
