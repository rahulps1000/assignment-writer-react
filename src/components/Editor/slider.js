import "./slider.css";
import React from "react";

function Slider({ title, onChange, value, min, max, step }) {
  return (
    <div className="c_slider">
      <p>{title}</p>
      <input
        defaultValue={value}
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={onChange}
      />
    </div>
  );
}

export default Slider;
