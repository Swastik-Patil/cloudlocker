import React from "react";
import getIcon from "../utils/IconsMap";

export const GridLayout = ({ data }) => {
  if (data.length === 0) return <div>No Files </div>;

  const openFile = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="grid-layout">
      {data.map((item, index) => (
        <div
          className="grid-layout__item"
          key={index}
          onClick={() => openFile(item.downloadURL)}
        >
          {/* Load Icon */}
          <img
            src={getIcon(String(item.fileName).split(".")[1])}
            alt="file icon"
            width={70}
            height={70}
          />

          <h5>{item.name}</h5>
        </div>
      ))}
    </div>
  );
};
