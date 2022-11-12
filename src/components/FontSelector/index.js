import "./index.css";
import React from "react";
import { useDropzone } from "react-dropzone";
import FontView from "./fontview";

function FontSelector({
  selectedFont = null,
  fullScreen = false,
  onFontSelect,
  fonts,
  defaultFontCount,
  setFonts,
}) {
  const onDrop = (files) => {
    const file = files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const num = fonts.length - defaultFontCount;
      setFonts(fonts.concat([{ name: `Custom ${num ? num : ""}`, file: url }]));
      onFontSelect(fonts.length);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "font/otf": [],
      "font/ttf": [],
      "font/woff": [],
      "font/woff2": [],
    },
    onDrop,
  });
  return (
    <div className={fullScreen ? "bigf" : "smallf"}>
      <p>Select a Font</p>
      <div className="font-selector">
        {fonts.map((font, index) => {
          return (
            <FontView
              key={index}
              index={index}
              font_path={font.file}
              isdefault={index < defaultFontCount}
              title={font.name}
              onClick={onFontSelect}
              selected={selectedFont === index}
            />
          );
        })}
        <div {...getRootProps({ className: "dragndrop" })}>
          Drag 'n' Drop or Click to Upload
          <input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
}

export default FontSelector;
