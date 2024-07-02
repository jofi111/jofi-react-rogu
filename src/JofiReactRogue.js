import React from "react";

const RRogue = ({ width, height, tilesize }) => (
  <canvas
    width={width * tilesize}
    height={height * tilesize}
    style={{ border: "1px solid black" }}
  ></canvas>
);

export default RRogue;
