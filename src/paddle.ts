import { Sprite, Texture } from "pixi.js";
import { Boat } from "./boat";
import Victor from "victor";

export class Paddle {
  owner: Boat;
  num: number;
  sprite: Sprite = new Sprite();

  static offsets: Victor[] = [new Victor(-15, 0), new Victor(15, 0)];

  strokePhase: number = 0; // current position
  strokeSpeed: number = 0.25;
  maxStrokeAngle: number = 0.5; // max rotation during stroke

  constructor(owner: Boat, num: number, texture: Texture) {
    this.owner = owner;
    this.num = num;
    this.sprite.texture = texture;
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.set(1.2);
  }

  tick(dt: number, isActive: boolean) {
    const offset = Paddle.offsets[this.num];
    const boatRot = this.owner.sprite.rotation;

    const rotatedOffset = new Victor(
      offset.x * Math.cos(boatRot) - offset.y * Math.sin(boatRot),
      offset.x * Math.sin(boatRot) + offset.y * Math.cos(boatRot),
    );

    this.sprite.position.x = this.owner.sprite.position.x + rotatedOffset.x;
    this.sprite.position.y = this.owner.sprite.position.y + rotatedOffset.y;

    if (isActive) {
      this.strokePhase += this.strokeSpeed * dt;
    } else {
      this.strokePhase = -1; // back to neutral position
    }

    const direction = this.num == 0 ? 1 : -1; // mirror for left/right paddle
    const strokeAngle =
      Math.sin(this.strokePhase) * this.maxStrokeAngle * direction;

    switch (this.num) {
      case 0:
        this.sprite.rotation = boatRot - Math.PI / 2 + strokeAngle;
        break;
      case 1:
        this.sprite.rotation = boatRot + Math.PI / 2 + strokeAngle;
        break;
    }
  }
}
