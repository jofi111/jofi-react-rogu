import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs.js";

const lootTable = [
  { name: "Long Sword", color: "darkgrey", ascii: "/", offset: { x: 6, y: 3 } },
  { name: "Health Potion", color: "red", ascii: "!", offset: { x: 6, y: 3 } },
  { name: "Gold Coin", color: "yellow", ascii: "$", offset: { x: 3, y: 3 } },
  {
    name: "Light Armor",
    color: "lightgrey",
    ascii: "#",
    offset: { x: 4, y: 3 },
  },
];

const monsterTable = [
  {
    name: "Ogre",
    color: "lightgrey",
    ascii: "0",
    offset: { x: 2, y: 3 },
    health: 6,
  },
  {
    name: "Kobold",
    color: "green",
    ascii: "k",
    offset: { x: 4, y: 3 },
    health: 3,
  },
  {
    name: "Slime",
    color: "darkgreen",
    ascii: "S",
    offset: { x: 3, y: 2 },
    health: 2,
  },
  {
    name: "Dragon",
    color: "red",
    ascii: "D",
    offset: { x: 2, y: 3 },
    health: 10,
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
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        lootTable[getRandomInt(lootTable.length)]
      );
    });
  }

  spawnMonsters(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Monster(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tilesize,
        monsterTable[getRandomInt(lootTable.length)]
      );
    });
  }

  spawnStairs() {
    let stairs = new Stairs(
      this.world.width - 10,
      this.world.height - 10,
      this.world.tilesize
    );
    this.world.add(stairs);
    this.world.moveToSpace(stairs);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default Spawner;
