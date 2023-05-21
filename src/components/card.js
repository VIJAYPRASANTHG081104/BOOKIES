import React from "react";
import "./card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function Card(props) {
  console.log(props);
  return (
    <div className="maincontainer">
      <div className="container" id={props.id}>
        <img src={props.img} alt="img" id="img" height={210} width={230} />
        <p id="para">
          <FontAwesomeIcon icon={faStar} />
          {props.rating}
          <span id="title">{props.title}</span>
        </p>
        <p id="des">{props.description}</p>
        <button className="addDeleteBtn2">delete</button>
        <a href={props.download_url}>
          <button id="download" >
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </a>
      </div>
    </div>
  );
}
