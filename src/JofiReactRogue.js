import React from "react";

const RRogue = (props) => (
  <canvas
    width={props.width * props.tilesize}
    height={props.height * props.tilesize}
    style={{ border: "1px solid black" }}
  ></canvas>
);

export default RRogue;
