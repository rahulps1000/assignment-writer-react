import React from "react";
import "./font.css";

function FontView({ index, font_path, title, selected, isdefault, onClick }) {
  var font = null;
  if (isdefault) {
    font = require("../../assets/fonts/" + font_path);
  } else {
    font = font_path;
  }
  const myFont = new FontFace(title.split(" ").join(""), `url(${font})`);
  myFont.load().then(() => {
    document.fonts.add(myFont);
  });
  return (
    <div
      className={`Font${selected ? " selected" : ""}`}
      onClick={() => onClick(index)}
      style={{ fontFamily: title.split(" ").join("") }}
    >
      {title}
    </div>
  );
}

export default FontView;
