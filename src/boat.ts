import { Assets, Color, ColorMask, Sprite, Texture } from "pixi.js";
import { Paddle } from "./paddle";
import Victor from "victor";

export class Boat {
  position: Victor;
  facing: number = 0; // In radians
  speed: Victor = new Victor(0, 0);
  maxSpeed: number = 5;
  acceleration: number = 0.2;
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
    this.playernum = playernum;
    this.sprite = new Sprite();
    this.color = color;
    this.sprite.position = position;
    this.sprite.anchor.set(0.5);
    this.sprite.scale = 2;
    this.sprite.tint = this.color;
    this.sprite.texture = texture;
    for (let i = 0; i < 2; i++) {
      const paddle = new Paddle(this, i, paddletexture);
      this.paddles.push(paddle);
    }
  }
  async tick() {
    return;
  }
}
