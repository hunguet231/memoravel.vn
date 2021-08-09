import React from "react";

const VectaryIframe = ({ id, src }) => {
  return (
    <iframe
      className="vectary-box"
      style={{ background: "#f2f2f2" }}
      id={id}
      src={src}
      frameBorder="1"
      allowtransparency
      webkitallowfullscreen
      mozallowfullscreen
      allowFullScreen
      width="100%"
      height="100%"
    ></iframe>
  );
};

export default VectaryIframe;
