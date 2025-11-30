import { Color, Sprite, Texture, Ticker } from "pixi.js";
import { Paddle } from "./paddle";
import Victor from "victor";
import { Game } from "./gamestate";

export class Boat {
  game: Game;

  position: Victor;

  speed: Victor = new Victor(0, 0);
  maxSpeed: number = 10;
  acceleration: number = 0.04; // units per frame at 60fps

  turning_speed: number = 0;
  turning_accel: number = 0.003; // radians per frame at 60fps
  turning_max: number = 0.05; // max radians per frame at 60fps

  friction: number = 0.002; // decay per frame at 60fps (lower = more slippery like ice)
  turning_friction: number = 0.01; // decay per frame at 60fps
  turn_thrust: number = 0.01; // forward thrust added when turning (Minecraft-like)

  playernum: number;
  color: Color;
  sprite: Sprite;

  paddles: Paddle[] = [];

  constructor(
    position: Victor,
    playernum: number,
    color: Color,
    texture: Texture,
    paddletexture: Texture,
    game: Game,
  ) {
    this.game = game;
    this.position = position;
    this.playernum = playernum;
    this.sprite = new Sprite();
    this.color = color;
    this.sprite.anchor.set(0.5);
    this.sprite.scale = 1.2;
    this.sprite.tint = this.color;
    this.sprite.texture = texture;
    for (let i = 0; i < 2; i++) {
      const paddle = new Paddle(this, i, paddletexture);
      this.paddles.push(paddle);
    }
  }
  async tick(time: Ticker) {
    const dt = time.deltaTime;

    this.sprite.position.x = this.position.x;
    this.sprite.position.y = this.position.y;

    // Apply friction using exponential decay (works correctly with any dt)
    this.speed.multiplyScalar(Math.pow(1 - this.friction, dt));
    this.turning_speed *= Math.pow(1 - this.turning_friction, dt);

    if (this.speed.lengthSq() > this.maxSpeed * this.maxSpeed) {
      this.speed = this.speed.normalize().multiplyScalar(this.maxSpeed);
    }

    this.turning_speed = Math.max(
      -this.turning_max,
      Math.min(this.turning_max, this.turning_speed),
    );

    this.sprite.rotation += this.turning_speed * dt;

    this.position.add(this.speed.clone().multiplyScalar(dt));

    this.handle_input(dt);
    return;
  }
  handle_input(dt: number) {
    const keybinds = Game.keybinds[this.playernum];
    if (this.game.pressed_keys.has(keybinds.forward)) {
      const forward_vector = new Victor(
        Math.cos(this.sprite.rotation - Math.PI / 2),
        Math.sin(this.sprite.rotation - Math.PI / 2),
      );
      this.speed.add(forward_vector.multiplyScalar(this.acceleration * dt));
    }
    if (this.game.pressed_keys.has(keybinds.left)) {
      this.turning_speed -= this.turning_accel * dt;
      // Turning adds forward thrust (Minecraft ice boat behavior)
      const facing = new Victor(
        Math.cos(this.sprite.rotation - 0.5 - Math.PI / 2),
        Math.sin(this.sprite.rotation - 0.5 - Math.PI / 2),
      );
      this.speed.add(facing.multiplyScalar(this.turn_thrust * dt));
    }
    if (this.game.pressed_keys.has(keybinds.right)) {
      this.turning_speed += this.turning_accel * dt;
      // Turning adds forward thrust (Minecraft ice boat behavior)
      const facing = new Victor(
        Math.cos(this.sprite.rotation + 0.5 - Math.PI / 2),
        Math.sin(this.sprite.rotation + 0.5 - Math.PI / 2),
      );
      this.speed.add(facing.multiplyScalar(this.turn_thrust * dt));
    }
  }
}
