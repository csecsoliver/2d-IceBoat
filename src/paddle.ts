import { Sprite, Texture } from "pixi.js";
import { Boat } from "./boat";
import Victor from "victor";

export class Paddle {
  owner: Boat;
  num: number;
  sprite: Sprite = new Sprite();
  static positions: Victor[] = [new Victor(0, 1), new Victor(1, 1)];
  constructor(owner: Boat, num: number, texture: Texture) {
    this.owner = owner;
    this.num = num;
    this.sprite.texture = texture;
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.set(1.5, 1.5);
  }
  tick(delta: number) {}
}
