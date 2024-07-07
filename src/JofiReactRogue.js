import React, { useRef, useEffect, useState } from "react";
import InputManager from "./InputManager.js";
import Player from "./Player.js";
import World from "./World.js";

const RRogue = ({ width, height, tilesize }) => {
  const canvasRef = useRef();
  //const [player, setPlayer] = useState(new Player(1, 2, tilesize));
  const [world, setWorld] = useState(new World(width, height, tilesize));
  const inputManager = useRef(new InputManager()).current;

  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.movePlayer(data.x, data.y);
    setWorld(newWorld);
    // setPlayer((prevPlayer) => {
    //   const newPlayer = new Player(prevPlayer.x, prevPlayer.y, prevPlayer.size);
    //   newPlayer.move(data.x, data.y);
    //   return newPlayer;
    // });
  };

  useEffect(() => {
    console.log("Create Map!");
    let newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    setWorld(newWorld);
  }, []); //prazdny parametr [] brani opakovanemu renderovani mapy pri kazdem pohybu hrace

  useEffect(() => {
    console.log("Bind input");
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  }, [inputManager]);

  useEffect(() => {
    console.log("Draw to canvas");
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, width * tilesize, height * tilesize);
    world.draw(ctx);
    //player.draw(ctx);
  }, [world, width, height, tilesize]);

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
