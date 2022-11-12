import "./index.css";
import React from "react";
import PageView from "./pageview";
import { useDropzone } from "react-dropzone";

function PageSelector({
  selectedPage,
  fullScreen,
  onPageSelect,
  pages,
  defaultPageCount,
  setPages,
}) {
  const onDrop = (files) => {
    const file = files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const num = pages.length - defaultPageCount;
      setPages(pages.concat([{ name: `Custom ${num ? num : ""}`, file: url }]));
      onPageSelect(pages.length);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop,
  });
  return (
    <div className={fullScreen ? "bigp" : "smallp"}>
      <p>Select a Page</p>
      <div className="page-selector">
        {pages.map((page, index) => {
          return (
            <PageView
              key={index}
              index={index}
              isdefault={index < defaultPageCount}
              image_path={page.file}
              title={page.name}
              onClick={onPageSelect}
              selected={selectedPage === index}
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

export default PageSelector;
