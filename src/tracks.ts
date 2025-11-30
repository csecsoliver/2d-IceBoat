import { Track } from "./types";

// I let AI make some tracks, cuz I'm lazy

export const tracks: Track[] = [
  {
    name: "Frozen Oval",
    pieces: [
      // Top straight

      { x1: 250, y1: 100, x2: 550, y2: 250 },
      // Top-right corner (angled pieces)
      { x1: 500, y1: 100, x2: 620, y2: 220 },
      { x1: 570, y1: 170, x2: 700, y2: 300 },
      // Right straight
      { x1: 550, y1: 250, x2: 700, y2: 550 },
      // Bottom-right corner (angled pieces)
      { x1: 570, y1: 500, x2: 700, y2: 630 },
      { x1: 500, y1: 580, x2: 620, y2: 700 },
      // Bottom straight
      { x1: 250, y1: 550, x2: 550, y2: 700 },
      // Bottom-left corner (angled pieces)
      { x1: 180, y1: 580, x2: 300, y2: 700 },
      { x1: 100, y1: 500, x2: 230, y2: 630 },
      // Left straight
      { x1: 100, y1: 250, x2: 250, y2: 550 },
      // Top-left corner (angled pieces)
      { x1: 100, y1: 170, x2: 230, y2: 300 },
      { x1: 180, y1: 100, x2: 300, y2: 220 },
    ],
    line: { x1: 400, y1: 100, x2: 400, y2: 250 },
  },
  {
    name: "Rounded Square",
    pieces: [
      // Top straight
      { x1: 250, y1: 100, x2: 550, y2: 200 },
      // Top-right corner
      { x1: 500, y1: 100, x2: 620, y2: 200 },
      { x1: 570, y1: 150, x2: 700, y2: 280 },
      { x1: 600, y1: 230, x2: 700, y2: 350 },
      // Right straight
      { x1: 600, y1: 300, x2: 700, y2: 500 },
      // Bottom-right corner
      { x1: 600, y1: 450, x2: 700, y2: 570 },
      { x1: 570, y1: 520, x2: 700, y2: 650 },
      { x1: 500, y1: 600, x2: 620, y2: 700 },
      // Bottom straight
      { x1: 250, y1: 600, x2: 550, y2: 700 },
      // Bottom-left corner
      { x1: 180, y1: 600, x2: 300, y2: 700 },
      { x1: 100, y1: 520, x2: 230, y2: 650 },
      { x1: 100, y1: 450, x2: 200, y2: 570 },
      // Left straight
      { x1: 100, y1: 300, x2: 200, y2: 500 },
      // Top-left corner
      { x1: 100, y1: 230, x2: 200, y2: 350 },
      { x1: 100, y1: 150, x2: 230, y2: 280 },
      { x1: 180, y1: 100, x2: 300, y2: 200 },
    ],
    line: { x1: 400, y1: 100, x2: 400, y2: 200 },
  },
  {
    name: "Figure Eight",
    pieces: [
      // Left loop - top
      { x1: 150, y1: 150, x2: 350, y2: 270 },
      // Left loop - top-right corner
      { x1: 300, y1: 150, x2: 420, y2: 270 },
      { x1: 370, y1: 220, x2: 480, y2: 350 },
      // Left loop - right side
      { x1: 380, y1: 300, x2: 480, y2: 500 },
      // Center crossing
      { x1: 300, y1: 350, x2: 500, y2: 470 },
      // Left loop - bottom-right corner
      { x1: 370, y1: 450, x2: 480, y2: 580 },
      { x1: 300, y1: 530, x2: 420, y2: 650 },
      // Left loop - bottom
      { x1: 150, y1: 530, x2: 350, y2: 650 },
      // Left loop - bottom-left corner
      { x1: 80, y1: 530, x2: 200, y2: 650 },
      { x1: 20, y1: 450, x2: 130, y2: 580 },
      // Left loop - left side
      { x1: 20, y1: 300, x2: 130, y2: 500 },
      // Left loop - top-left corner
      { x1: 20, y1: 220, x2: 130, y2: 350 },
      { x1: 80, y1: 150, x2: 200, y2: 270 },
      // Right loop - top
      { x1: 450, y1: 150, x2: 650, y2: 270 },
      // Right loop - top-right corner
      { x1: 600, y1: 150, x2: 720, y2: 270 },
      { x1: 670, y1: 220, x2: 780, y2: 350 },
      // Right loop - right side
      { x1: 680, y1: 300, x2: 780, y2: 500 },
      // Right loop - bottom-right corner
      { x1: 670, y1: 450, x2: 780, y2: 580 },
      { x1: 600, y1: 530, x2: 720, y2: 650 },
      // Right loop - bottom
      { x1: 450, y1: 530, x2: 650, y2: 650 },
      // Right loop - bottom-left corner
      { x1: 370, y1: 530, x2: 500, y2: 650 },
      { x1: 320, y1: 450, x2: 420, y2: 580 },
      // Right loop - left side
      { x1: 320, y1: 300, x2: 420, y2: 500 },
      // Right loop - top-left corner
      { x1: 320, y1: 220, x2: 420, y2: 350 },
      { x1: 370, y1: 150, x2: 500, y2: 270 },
    ],
    line: { x1: 250, y1: 150, x2: 250, y2: 270 },
  },
  {
    name: "Smooth Oval Large",
    pieces: [
      // Top straight
      { x1: 200, y1: 80, x2: 600, y2: 200 },
      // Top-right curve
      { x1: 550, y1: 80, x2: 680, y2: 180 },
      { x1: 620, y1: 130, x2: 750, y2: 270 },
      { x1: 680, y1: 220, x2: 800, y2: 380 },
      // Right straight
      { x1: 700, y1: 330, x2: 800, y2: 520 },
      // Bottom-right curve
      { x1: 680, y1: 470, x2: 800, y2: 630 },
      { x1: 620, y1: 580, x2: 750, y2: 720 },
      { x1: 550, y1: 670, x2: 680, y2: 770 },
      // Bottom straight
      { x1: 200, y1: 650, x2: 600, y2: 770 },
      // Bottom-left curve
      { x1: 120, y1: 670, x2: 250, y2: 770 },
      { x1: 50, y1: 580, x2: 180, y2: 720 },
      { x1: 0, y1: 470, x2: 120, y2: 630 },
      // Left straight
      { x1: 0, y1: 330, x2: 100, y2: 520 },
      // Top-left curve
      { x1: 0, y1: 220, x2: 120, y2: 380 },
      { x1: 50, y1: 130, x2: 180, y2: 270 },
      { x1: 120, y1: 80, x2: 250, y2: 180 },
    ],
    line: { x1: 400, y1: 80, x2: 400, y2: 200 },
  },
  {
    name: "Racetrack Pro",
    pieces: [
      // Main straight (top)
      { x1: 200, y1: 100, x2: 700, y2: 220 },
      // Turn 1 (top-right, banked)
      { x1: 650, y1: 100, x2: 780, y2: 220 },
      { x1: 720, y1: 170, x2: 850, y2: 320 },
      { x1: 780, y1: 270, x2: 900, y2: 430 },
      // Back straight (right)
      { x1: 800, y1: 380, x2: 900, y2: 600 },
      // Turn 2 (bottom-right)
      { x1: 780, y1: 550, x2: 900, y2: 710 },
      { x1: 720, y1: 660, x2: 850, y2: 810 },
      { x1: 650, y1: 760, x2: 780, y2: 880 },
      // Main straight (bottom)
      { x1: 200, y1: 760, x2: 700, y2: 880 },
      // Turn 3 (bottom-left)
      { x1: 120, y1: 760, x2: 250, y2: 880 },
      { x1: 50, y1: 660, x2: 180, y2: 810 },
      { x1: 0, y1: 550, x2: 120, y2: 710 },
      // Back straight (left)
      { x1: 0, y1: 380, x2: 100, y2: 600 },
      // Turn 4 (top-left)
      { x1: 0, y1: 270, x2: 120, y2: 430 },
      { x1: 50, y1: 170, x2: 180, y2: 320 },
      { x1: 120, y1: 100, x2: 250, y2: 220 },
    ],
    line: { x1: 450, y1: 100, x2: 450, y2: 220 },
  },
  {
    name: "Simple Loop",
    pieces: [
      // Top
      { x1: 200, y1: 150, x2: 600, y2: 300 },
      // Top-right
      { x1: 500, y1: 150, x2: 650, y2: 350 },
      // Right
      { x1: 500, y1: 300, x2: 650, y2: 550 },
      // Bottom-right
      { x1: 500, y1: 500, x2: 650, y2: 700 },
      // Bottom
      { x1: 200, y1: 550, x2: 600, y2: 700 },
      // Bottom-left
      { x1: 150, y1: 500, x2: 300, y2: 700 },
      // Left
      { x1: 150, y1: 300, x2: 300, y2: 550 },
      // Top-left
      { x1: 150, y1: 150, x2: 300, y2: 350 },
    ],
    line: { x1: 400, y1: 150, x2: 400, y2: 300 },
  },
  {"pieces":[{"x1":500,"y1":350,"x2":550,"y2":400},{"x1":500,"y1":400,"x2":550,"y2":450},{"x1":500,"y1":450,"x2":550,"y2":500},{"x1":550,"y1":400,"x2":600,"y2":450},{"x1":550,"y1":450,"x2":600,"y2":500},{"x1":550,"y1":500,"x2":600,"y2":550},{"x1":600,"y1":450,"x2":650,"y2":500},{"x1":600,"y1":500,"x2":650,"y2":550},{"x1":550,"y1":550,"x2":600,"y2":600},{"x1":500,"y1":600,"x2":550,"y2":650},{"x1":450,"y1":600,"x2":500,"y2":650},{"x1":500,"y1":550,"x2":550,"y2":600},{"x1":550,"y1":600,"x2":600,"y2":650},{"x1":400,"y1":600,"x2":450,"y2":650},{"x1":400,"y1":550,"x2":450,"y2":600},{"x1":400,"y1":500,"x2":450,"y2":550},{"x1":400,"y1":450,"x2":450,"y2":500},{"x1":450,"y1":450,"x2":500,"y2":500},{"x1":450,"y1":400,"x2":500,"y2":450},{"x1":350,"y1":500,"x2":400,"y2":550},{"x1":350,"y1":550,"x2":400,"y2":600},{"x1":350,"y1":600,"x2":400,"y2":650},{"x1":400,"y1":650,"x2":450,"y2":700},{"x1":450,"y1":650,"x2":500,"y2":700},{"x1":500,"y1":650,"x2":550,"y2":700},{"x1":400,"y1":400,"x2":450,"y2":450},{"x1":350,"y1":450,"x2":400,"y2":500}],"name":"Goofy Circle","line":{"x1":525,"y1":350,"x2":525,"y2":500}},
];
