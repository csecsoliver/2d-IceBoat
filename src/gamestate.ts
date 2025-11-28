import { Application, Assets, Color } from "pixi.js";
import { Boat } from "./boat";
import Victor from "victor";

export class Game {
  players: Boat[] = [];
  app: Application = new Application();
  static colors: string[][] = [
    [],
    ["red"],
    ["red", "blue"],
    ["red", "blue", "green"],
    ["red", "blue", "green", "yellow"],
  ];
  static position_vectors = [
    new Victor(100, 100),
    new Victor(200, 100),
    new Victor(300, 100),
    new Victor(400, 100),
  ];
  async init(playercount: number) {
    await this.app.init({ background: "#1099bb", resizeTo: window });
    document.getElementById("app")!.innerHTML = "";
    document.getElementById("app")!.appendChild(this.app.canvas);
    const texture = await Assets.load("/assets/boat.webp");
    const paddletexture = await Assets.load("/assets/paddle.webp");

    for (let i = 0; i < playercount; i++) {
      this.players.push(
        new Boat(
          Game.position_vectors[i],
          i,
          new Color(Game.colors[playercount][i]),
          texture,
          paddletexture,
        ),
      );
      this.app.stage.addChild(this.players[i].sprite);
    }
  }
  tick() {
    for (const i of this.players) {
      i.tick();
    }
  }
}
