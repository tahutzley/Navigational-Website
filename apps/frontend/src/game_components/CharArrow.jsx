import React from "react";

const CharArrow = ({ direction, onClick }) => {
  const arrowImg = "direction";

  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={arrowImg} alt={`${direction} arrow`} />
    </div>
  );
};

export default CharArrow;
