import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "./download.css";

function Download({ onClick }) {
  return (
    <div className="btn-slide2" onClick={onClick}>
      <span className="circle2">
        <FontAwesomeIcon icon={faDownload} />
      </span>
      <span className="title2">Download</span>
      <span className="title-hover2">Click here</span>
    </div>
  );
}

export default Download;
