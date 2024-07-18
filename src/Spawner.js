import Loot from "./Loot";

const lootTable = [
  { name: "Long Sword", color: "darkgrey", ascii: "/", offset: { x: 6, y: 3 } },
  { name: "Helath Potion", color: "red", ascii: "!", offset: { x: 6, y: 3 } },
  { name: "Gold Coin", color: "yellow", ascii: "$", offset: { x: 3, y: 3 } },
  {
    name: "Light Armor",
    color: "lightgrey",
    ascii: "#",
    offset: { x: 4, y: 3 },
  },
];

class Spawner {
  constructor(world) {
    this.world = world;
  }
  spawn(spawnCount, createEntity) {
    let freeSpaces = [];
    for (let x = 0; x < this.world.width; x++) {
      for (let y = 0; y < this.world.height; y++) {
        if (
          this.world.worldmap[x][y] === 0 &&
          !this.world.getEntityAtLocation(x, y)
        ) {
          freeSpaces.push({ x, y });
        }
      }
    }

    for (let count = 0; count < spawnCount; count++) {
      if (freeSpaces.length === 0) return;

      let randomIndex = Math.floor(Math.random() * freeSpaces.length);
      let { x, y } = freeSpaces.splice(randomIndex, 1)[0]; // Remove selected space

      let entity = createEntity();
      entity.x = x;
      entity.y = y;
      this.world.add(entity);
    }
  }

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Loot(
        0,
        0,
        this.world.tilesize,
        lootTable[getRandomInt(lootTable.length)]
      );
    });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
