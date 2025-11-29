import { Color, Sprite, Texture, Ticker } from "pixi.js";
import { Paddle } from "./paddle";
import Victor from "victor";

export class Boat {
  position: Victor;

  speed: Victor = new Victor(0, 0);
  maxSpeed: number = 5;
  acceleration: number = 0.2;

  turning_speed: number = 0;
  turning_accel: number = 0.001;
  turning_max: number = 0.02;

  friction: number = 0.05;

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
  ) {
    this.position = position;
    this.playernum = playernum;
    this.sprite = new Sprite();
    this.color = color;
    this.sprite.anchor.set(0.5);
    this.sprite.scale = 2;
    this.sprite.tint = this.color;
    this.sprite.texture = texture;
    for (let i = 0; i < 2; i++) {
      const paddle = new Paddle(this, i, paddletexture);
      this.paddles.push(paddle);
    }
  }
  async tick(time: Ticker) {
    this.sprite.position.x = this.position.x;
    this.sprite.position.y = this.position.y;
    this.sprite.rotation += this.turning_speed * time.deltaTime;
    if (Math.abs(this.sprite.rotation) > this.turning_max) {
      this.turning_speed =
        (Math.abs(this.turning_speed) / this.turning_max) * this.turning_speed;
    }
    this.sprite.position.add(this.speed.clone().multiplyScalar(time.deltaTime));
    if (this.speed.lengthSq() > this.maxSpeed) {
      this.speed.multiplyScalar(1 - this.friction * 10 * time.deltaTime);
    }
    this.speed.multiplyScalar(1 - this.friction * time.deltaTime);
    return;
  }
}
