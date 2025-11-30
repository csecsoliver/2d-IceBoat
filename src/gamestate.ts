import { Application, Assets, Color, Graphics, HTMLText, Text, Texture, Ticker } from "pixi.js";
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
  timer: number = 0;
  timerText: Text = new Text({
      text: `${(this.timer / 1000).toFixed(2)}`,
      style: { fill: 0xff00ff, fontSize: 24, fontFamily: "monospace" },
      x: 10,
      y: 10,
    });
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
  move: boolean = true;
  laps: number = 1;
  placings: Boat[] = [];
  finish_times: number[] = [];
  onGameOver: (() => void) | null = null;

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

  async init(playercount: number, laps: number) {
    this.laps = laps;
    document.addEventListener("keydown", (e) => {
      this.pressed_keys.add((e as KeyboardEvent).code);
    });
    document.addEventListener("keyup", (e) => {
      this.pressed_keys.delete((e as KeyboardEvent).code);
    });
    await this.app.init({ width: 1000, height: 800, backgroundColor: 0x111111 });
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
      this.players[i].tick(this.app.ticker); // to be at the start
    }
    const text = new Text({text: "Ready?", style: {fill: 0xff00ff, fontSize: 64, fontFamily: "monospace"}});
    this.app.stage.addChild(text);
    text.x = this.app.screen.width / 2;
    text.y = this.app.screen.height / 2;
    text.anchor.set(0.5);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    text.text = "Set!";
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    text.text = "Go!";

    this.app.stage.addChild(this.timerText);
    setTimeout(() => {
      this.app.stage.removeChild(text);
    }, 1000);
  }
  draw_track() {
    if (!this.track) return;
    for (const piece of this.track.pieces) {
      const graphics = new Graphics();
      graphics.setFillStyle({ color: 0xffffff });
      graphics.rect(
        piece.x1,
        piece.y1,
        piece.x2 - piece.x1,
        piece.y2 - piece.y1
      );
      graphics.fill();
      this.app.stage.addChild(graphics);
    }
    const graphics = new Graphics();
    graphics.setFillStyle({ color: 0xff0000 });
    this.track.line.x2 = this.track.line.x1 + 1;
    graphics.rect(
      this.track.line.x1,
      this.track.line.y1,
      this.track.line.x2 - this.track.line.x1 + 4,
      this.track.line.y2 - this.track.line.y1 
    );
    console.log("Track drawn");
    graphics.fill();
    this.app.stage.addChild(graphics);
  }
  tick(time: Ticker) {
    let alive_counter = 0;
    let finished_counter = 0;
    this.timerText.text = `${(this.timer / 1000).toFixed(3)}s`;
    for (const i of this.players) {
      if (i.alive && this.move && !i.finished) {
        i.tick(time);
        alive_counter++;
        if (i.laps_done >= this.laps) {
          i.finished = true;
          this.placings.push(i);
          this.finish_times[i.playernum] = parseFloat(((this.timer + time.deltaMS) / 1000).toFixed(3));
          document.getElementById("log")!.innerHTML = `<pre>${this.placings.map((p, index) => `#${index + 1}: ${Game.colors[4][p.playernum]} - ${p.laps_done} laps in ${this.finish_times[p.playernum] || 0} seconds`).join("\n")}</pre>`;
        }
      } else if (!i.alive) {
        i.fadeout();
      } else if (!this.move) {
        alive_counter++;
      } else if (i.finished) {
        i.tick(time);
        alive_counter++;
        finished_counter++;
      }
      
    }
    if (
      ((this.players.length > 1 && alive_counter <= 1) || alive_counter < 1) &&
      this.move
    ) {
      const winners = this.players.filter((p) => p.alive);
      if (winners.length > 0) {
        this.gameover(`Player ${Game.colors[4][winners[0].playernum]} wins!`);
      } else {
        this.gameover("No winners!");
      }
      this.move = false;
    }
    if (finished_counter >= this.players.length) {
      this.gameover("All players finished!");
      this.move = false;
    }
    if (this.move) {
      this.timer += time.deltaMS;
    }
  }
  gameover(msg: string) {
    
    document.getElementById("log")!.innerHTML += `<pre>${msg}</pre>`;
    const button_restart = document.createElement("button");
    button_restart.innerText = "Titlescreen";
    button_restart.id = "button_restart_game";
    button_restart.addEventListener("click", () => {
      this.onGameOver?.();
      document.getElementById("log")!.innerHTML = "";
    });
    const button_retry = document.createElement("button");
    button_retry.innerText = "Retry";
    button_retry.id = "button_retry_game";
    button_retry.addEventListener("click", async () => {
      const game = new Game();
      game.onGameOver = this.onGameOver;
      game.track = this.track;
      document.getElementById("log")!.innerHTML = "";
      await game.init(this.players.length, this.laps);
      game.app.ticker.add((time) => {
        game.tick(time);
      });
      console.log("Retrying game");
    });
    document.getElementById("log")!.appendChild(button_retry);
    document.getElementById("log")!.appendChild(button_restart);
  }
}
