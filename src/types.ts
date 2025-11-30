export type Keybinds = { forward: string; left: string; right: string };
export type TrackPiece = { x1: number; y1: number; x2: number; y2: number };
export type Track = {
  name: string;
  pieces: TrackPiece[];
  line: TrackPiece; // starting/finishing line
};
