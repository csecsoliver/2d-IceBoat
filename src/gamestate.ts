import { Application, Assets, Color, Graphics, Texture, Ticker } from "pixi.js";
import { Boat } from "./boat";
import Victor from "victor";
import { Keybinds, Track } from "./types";
import { tracks } from "./tracks";

export class Game {
  players: Boat[] = [];
  app: Application = new Application();
  pressed_keys: Set<string> = new Set();
  static colors: string[][] = [
    [],
    ["red"],
    ["red", "blue"],
    ["red", "blue", "green"],
    ["red", "blue", "green", "yellow"],
  ];
  // static position_vectors = [
  //   new Victor(100, 100),
  //   new Victor(200, 100),
  //   new Victor(300, 100),
  //   new Victor(400, 100),
  // ];

  static keybinds: Keybinds[] = [
    { forward: "KeyW", left: "KeyA", right: "KeyD" },
    { forward: "ArrowUp", left: "ArrowLeft", right: "ArrowRight" },
    { forward: "KeyI", left: "KeyJ", right: "KeyL" },
    { forward: "KeyT", left: "KeyF", right: "KeyH" },
  ];
  track: Track | null = tracks[5];
  start_angle: number = Math.PI / 2;
  getStartPositions(playercount: number): Victor[] {
    if (!this.track) {
      return [
        new Victor(100, 100),
        new Victor(200, 100),
        new Victor(300, 100),
        new Victor(400, 100),
      ];
    }
    const line = this.track.line;
    const positions: Victor[] = [];

    for (let i = 0; i < playercount; i++) {
      const t = (i + 1) / (playercount + 1);
      const x = line.x1 + (line.x2 - line.x1) * t;
      const y = line.y1 + (line.y2 - line.y1) * t;
      positions.push(new Victor(x, y));
    }
    return positions;
  }

  async init(playercount: number) {
    await this.app.init({ resizeTo: window });
    document.getElementById("app")!.innerHTML = "";
    document.getElementById("app")!.appendChild(this.app.canvas);
    const texture: Texture = await Assets.load("/assets/boat.webp");
    const paddletexture: Texture = await Assets.load("/assets/paddle.webp");
    this.draw_track();
    const startPositions = this.getStartPositions(playercount);
    for (let i = 0; i < playercount; i++) {
      this.players.push(
        new Boat(
          startPositions[i],
          i,
          new Color(Game.colors[playercount][i]),
          texture,
          paddletexture,
          this
        )
      );
      this.players[i].sprite.rotation = this.start_angle;
      this.app.stage.addChild(this.players[i].sprite);
      for (const paddle of this.players[i].paddles) {
        this.app.stage.addChild(paddle.sprite);
      }
    }
    document.addEventListener("keydown", (e) => {
      this.pressed_keys.add((e as KeyboardEvent).code);
    });
    document.addEventListener("keyup", (e) => {
      this.pressed_keys.delete((e as KeyboardEvent).code);
    });
  }
  draw_track() {
    if (!this.track) return;
    for (const piece of this.track.pieces) {
      const graphics = new Graphics();
      graphics.setFillStyle({ width: 4, color: 0xffffff });
      graphics.rect(
        piece.x1,
        piece.y1,
        piece.x2 - piece.x1,
        piece.y2 - piece.y1
      );
      graphics.fill();
      this.app.stage.addChild(graphics);
    }
    // draw starting/finishing line in red
    const graphics = new Graphics();
    graphics.setStrokeStyle({ width: 4, color: 0xff0000 });
    graphics.moveTo(this.track.line.x1, this.track.line.y1);
    graphics.lineTo(this.track.line.x2, this.track.line.y2);
    console.log("Track drawn");
    graphics.stroke();
    this.app.stage.addChild(graphics);
  }
  tick(time: Ticker) {
    for (const i of this.players) {
      if (i.alive) {
        i.tick(time);
      } else {
        i.fadeout();
      }
    }
  }
}
