import React, { useRef, useEffect, useState } from "react";
import InputManager from "./InputManager.js";

const RRogue = ({ width, height, tilesize }) => {
  const canvasRef = useRef();
  const [player, setPlayer] = useState({ x: 64, y: 128 });
  let InputManager = new InputManager();
  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newPlayer = { ...player };
    newPlayer.x += data.x * tilesize;
    newPlayer.y += data.y * tilesize;
    setPlayer(newPlayer);
  };

  useEffect(() => {
    console.log("Bind input");
    InputManager.bindKeys();
    InputManager.subscribe(handleInput);
    return () => {
      InputManager.unbindKeys();
      InputManager.subscribe(handleInput);
    };
  });

  useEffect(() => {
    console.log("Draw to canvas");
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width * tilesize, height * tilesize);
    ctx.fillStyle = "#000";
    ctx.fillRect(player.x, player.y, 16, 16);
  });
  return (
    <canvas
      ref={canvasRef}
      width={width * tilesize}
      height={height * tilesize}
      style={{ border: "1px solid black" }}
    ></canvas>
  );
};

export default RRogue;
