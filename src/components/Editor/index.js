import "./index.css";
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import Slider from "./slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
} from "@fortawesome/free-solid-svg-icons";
import Download from "./download";

function Editor({ page, font, pages, fonts, dp }) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000F55");
  const [align, setAlign] = useState("justify");
  const [size, setSize] = useState(fonts[font].size ?? 16);
  const [height, setHeight] = useState(fonts[font].height ?? 15);
  const [paddingTop, setPaddingTop] = useState(pages[page].top ?? 0);
  const [paddingBottom, setPaddingBottom] = useState(pages[page].bottom ?? 0);
  const [paddingLeft, setPaddingLeft] = useState(pages[page].left ?? 0);
  const [paddingRight, setPaddingRight] = useState(pages[page].right ?? 0);

  useEffect(() => {
    setPaddingTop(pages[page].top ?? 0);
    setPaddingBottom(pages[page].bottom ?? 0);
    setPaddingLeft(pages[page].left ?? 0);
    setPaddingRight(pages[page].right ?? 0);
  }, [page, pages]);

  useEffect(() => {
    setSize(fonts[font].size ?? 16);
    setHeight(fonts[font].height ?? 15);
  }, [fonts, font]);

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const changeFontSize = (e) => {
    setSize(e.target.value);
  };

  const changeLineHeight = (e) => {
    setHeight(e.target.value);
  };

  const changePaddingTop = (e) => {
    setPaddingTop(e.target.value);
  };

  const changePaddingBottom = (e) => {
    setPaddingBottom(e.target.value);
  };

  const changePaddingLeft = (e) => {
    setPaddingLeft(e.target.value);
  };

  const changePaddingRight = (e) => {
    setPaddingRight(e.target.value);
  };

  if (page == null || font == null) {
    return null;
  }
  var image = null;
  if (dp) {
    image = require("../../assets/pages/" + pages[page].file);
  } else {
    image = pages[page].file;
  }
  var style = {
    color: color,
    fontFamily: fonts[font].name.split(" ").join(""),
    textAlign: align,
    fontSize: size + "px",
    lineHeight: height + "px",
    paddingTop: paddingTop + "px",
    paddingBottom: paddingBottom + "px",
    paddingLeft: paddingLeft + "px",
    paddingRight: paddingRight + "px",
  };

  async function download() {
    var canvasElement = document.getElementById("canvas");
    var canvas = await html2canvas(canvasElement);
    var url = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = url;
    link.click();
  }

  return (
    <div className={"editor"}>
      <div className="editor__controls">
        <textarea
          placeholder="Enter you assignment text here"
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <div className="padding_slider" title="Adjust to position text in page">
          Padding
          <Slider
            title="Top"
            onChange={changePaddingTop}
            index={0}
            value={paddingTop}
            min={0}
            max={250}
          />
          <Slider
            title="Bottom"
            onChange={changePaddingBottom}
            index={1}
            value={paddingBottom}
            min={0}
            max={200}
          />
          <Slider
            title="Left"
            onChange={changePaddingLeft}
            index={2}
            value={paddingLeft}
            min={0}
            max={250}
          />
          <Slider
            title="Right"
            onChange={changePaddingRight}
            index={3}
            value={paddingRight}
            min={0}
            max={200}
          />
        </div>
        <div className="padding_slider" title="Adjust text">
          Text Adjustments
          <Slider
            title="Font Size"
            onChange={changeFontSize}
            value={size}
            min={1}
            max={30}
            step={0.1}
          />
          <Slider
            title="Line Height"
            onChange={changeLineHeight}
            value={height}
            min={0}
            max={50}
            step={0.1}
          />
          <div className="alignment">
            Text Alignment
            <div>
              <FontAwesomeIcon
                icon={faAlignLeft}
                onClick={() => {
                  setAlign("left");
                }}
                className={align === "left" ? "active" : ""}
              />
              <FontAwesomeIcon
                icon={faAlignCenter}
                onClick={() => {
                  setAlign("center");
                }}
                className={align === "center" ? "active" : ""}
              />
              <FontAwesomeIcon
                icon={faAlignRight}
                onClick={() => {
                  setAlign("right");
                }}
                className={align === "right" ? "active" : ""}
              />
              <FontAwesomeIcon
                icon={faAlignJustify}
                onClick={() => {
                  setAlign("justify");
                }}
                className={align === "justify" ? "active" : ""}
              />
            </div>
          </div>
          <div className="alignment">
            Ink Color
            <input type="color" value={color} onChange={changeColor} />
          </div>
        </div>
      </div>
      <div className="output">
        <div className="output_group" id="canvas">
          <span style={style}>{text}</span>
          <img src={image} alt="page" />
        </div>
        <Download onClick={download} />
      </div>
    </div>
  );
}

export default Editor;
