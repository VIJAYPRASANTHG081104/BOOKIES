import React from "react";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faDownload } from "@fortawesome/free-solid-svg-icons";

//handledelete
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL:
    "https://bookies-387406-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(appSetting);
const database = getDatabase(app);

const handleDelete = async (id) => {
  console.log(id);
 
  try {
    const response = await fetch("http://localhost:3000/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      console.log("File deleted successfully");
    } else {
      console.log("Failed to delete file:", response.status);
    }
  } catch (error) {
    console.log("An error occurred while deleting the file:", error.message);
  }
  const dbRef = ref(database, id);
  remove(dbRef);
};


export default function Card(props) {
 
  // console.log(props);
  return (
    <div className="maincontainer">
      <div className="container1" id={props.id}>
        <img src={props.img} alt="img" id="img" height={210} width={230} />
        <p id="para">
          <FontAwesomeIcon icon={faStar} />
          {props.rating}
          <span id="title">{props.title}</span>
        </p>
        <p id="des">{props.description}</p>
        <button className="addDeleteBtn2" onClick={() => handleDelete(props.id)}>delete</button>
        <a href={props.download_url}>
          <button id="download" >
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </a>
      </div>
    </div>
  );
}
