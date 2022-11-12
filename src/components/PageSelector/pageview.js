import React from "react";
import "./page.css";

function PageView({ index, isdefault, image_path, title, selected, onClick }) {
  var image = null;
  if (isdefault) {
    image = require("../../assets/pages/" + image_path);
  } else {
    image = image_path;
  }
  return (
    <div
      className={`Page${selected ? " selected" : ""}`}
      onClick={() => onClick(index)}
    >
      <img src={image} alt={title} />
      {title}
    </div>
  );
}

export default PageView;
