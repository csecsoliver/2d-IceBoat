import { Game } from "./gamestate";
import { tracks } from "./tracks";
import { TrackPiece } from "./types";

export async function titlescreen() {
  const app = document.getElementById("app")!;
  app.innerHTML = "";
  const h1_title = document.createElement("h1");
  h1_title.innerText = "Ice Boat racing! (but 2D)";
  app.appendChild(h1_title);

  // Local multiplayer options
  const container_local = document.createElement("div");

  const h2_local_options = document.createElement("h2");
  h2_local_options.innerText = "Game Options";
  container_local.appendChild(h2_local_options);

  const div_local_options = document.createElement("div");

  const input_local_playercount = document.createElement("input");
  input_local_playercount.type = "number";
  input_local_playercount.value = "1";
  input_local_playercount.id = "input_local_playercount";
  input_local_playercount.min = "1";
  input_local_playercount.max = "4";

  const label_local_playercount = document.createElement("label");
  label_local_playercount.htmlFor = "input_local_playercount";
  label_local_playercount.innerText = "Number of players: ";

  const input_local_lapcount = document.createElement("input");
  input_local_lapcount.type = "number";
  input_local_lapcount.value = "1";
  input_local_lapcount.id = "input_local_lapcount";
  input_local_lapcount.min = "-8";
  input_local_lapcount.max = "8";

  const label_local_lapcount = document.createElement("label");
  label_local_lapcount.htmlFor = "input_local_lapcount";
  label_local_lapcount.innerText = "Number of laps: ";

  const input_local_track_selector = document.createElement("select");
  input_local_track_selector.id = "input_local_track_selector";
  for (const track of tracks) {
    const option = document.createElement("option");
    option.value = track.name;
    option.innerText = track.name;
    input_local_track_selector.appendChild(option);
  }

  const label_local_track_selector = document.createElement("label");
  label_local_track_selector.htmlFor = "input_local_track_selector";
  label_local_track_selector.innerText = "Select track: ";

  div_local_options.appendChild(document.createElement("hr"));
  div_local_options.appendChild(label_local_playercount);
  div_local_options.appendChild(input_local_playercount);
  div_local_options.appendChild(document.createElement("hr"));
  div_local_options.appendChild(label_local_lapcount);
  div_local_options.appendChild(input_local_lapcount);
  div_local_options.appendChild(document.createElement("hr"));
  div_local_options.appendChild(label_local_track_selector);
  div_local_options.appendChild(input_local_track_selector);
  div_local_options.appendChild(document.createElement("hr"));

  container_local.appendChild(div_local_options);

  const button_local_start = document.createElement("button");
  button_local_start.innerText = "Start Game";
  button_local_start.id = "button_local_start";
  button_local_start.addEventListener("click", () => {
    const playercount = parseInt(
      (document.getElementById("input_local_playercount") as HTMLInputElement)
        .value,
      10
    );
    local_game(playercount);
  });

  container_local.appendChild(button_local_start);
  app.appendChild(container_local);


  const container_trackbuilder = document.createElement("div");

  const h2_trackbuilder = document.createElement("h2");
  h2_trackbuilder.innerText = "Track Builder";
  container_trackbuilder.appendChild(h2_trackbuilder);
  const track_builder_info = document.createElement("p");
  track_builder_info.innerHTML =
    "Click cells to add/remove track pieces. Right-click a piece to set/remove the starting/finishing line. When done, click 'Export Track JSON' to get the track data you can use to play!<br>Note: Tracks are not saved anywhere, so be sure to export before leaving this screen.";
  track_builder_info.style.maxWidth = "40rem";
  container_trackbuilder.appendChild(track_builder_info);
  const button_open_trackbuilder = document.createElement("button");
  button_open_trackbuilder.innerText = "Open Track Builder";
  button_open_trackbuilder.id = "button_open_trackbuilder";
  button_open_trackbuilder.addEventListener("click", () => {
    app.innerHTML = "";
    app.appendChild(track_builder_ui());
  });
  container_trackbuilder.appendChild(button_open_trackbuilder);

  app.appendChild(container_trackbuilder);
}

async function local_game(players: number) {
  const game = new Game();
  game.onGameOver = titlescreen;
  game.track = tracks.find(
    (t) =>
      t.name ===
      (
        document.getElementById(
          "input_local_track_selector",
        ) as HTMLSelectElement
      ).value,
  )!;
  await game.init(players);
  game.app.ticker.add((time) => {
    game.tick(time);
  });
}
if (
  document.getElementById("app")!.innerHTML.trim() ===
  '<div id="pixi-container"></div>'
) {
  titlescreen();
}
console.log(document.getElementById("app")!.innerHTML.trim());


function track_builder_ui(): HTMLDivElement {
  const container = document.createElement("div");
  const table = document.createElement("table");
  const track = { pieces: [] as TrackPiece[], name: "Custom Track", line: {x1: 0, y1:0, x2:0, y2:0}  };
  for (let i = 0; i < 16; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < 20; j++) {
      const cell = document.createElement("td");
      cell.style.width = "20px";
      cell.style.height = "20px";
      cell.style.border = "1px solid #444";
      cell.style.backgroundColor = "#222";
      cell.style.textAlign = "center";
      cell.style.verticalAlign = "middle";
      cell.style.fontWeight = "900";
      cell.dataset["x"] = j.toString();
      cell.dataset["y"] = i.toString();
      cell.addEventListener("click", () => {
        if (track.pieces.findIndex(p => p.x1 === j*50 && p.y1 === i*50) === -1) {
          cell.style.backgroundColor = "#fff";
          cell.style.color = "#ff0000ff";
          track.pieces.push({ x1: j * 50, y1: i * 50, x2: j * 50 + 50, y2: i * 50 + 50 });
        } else {
          cell.style.backgroundColor = "#222";
          if (cell.innerText === "|") {
            for (const cell2 of table.querySelectorAll("td")) {
              cell2.innerText = "";
            }
            track.line = { x1: 0, y1: 0, x2: 0, y2: 0 };
          }
        
          track.pieces = track.pieces.filter(p => !(p.x1 === j*50 && p.y1 === i*50) );
        }
      });
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        if (track.pieces.findIndex(p => p.x1 === j*50 && p.y1 === i*50) != -1) {
          if (track.line.x1 === 0 && track.line.y1 === 0 && track.line.x2 === 0 && track.line.y2 === 0) {
            cell.innerText = "|";
            track.line = { x1: j * 50 + 25, y1: i * 50, x2: j * 50 + 25, y2: i * 50 + 50 };
          } else if (track.line.y1 == i * 50 + 50) {
            cell.innerText = "|";
            track.line.y1 = i * 50;
          } else if (track.line.y2 == i * 50) {
            cell.innerText = "|";
            track.line.y2 = i * 50 + 50;
          } else if (cell.innerText === "|") {
            cell.innerText = "";
            for (const cell2 of table.querySelectorAll("td")) {
              cell2.innerText = "";
            }
            track.line = { x1: 0, y1: 0, x2: 0, y2: 0 };
          }
        } else {
          
        }

      });
      row.appendChild(cell);
    }
    table.appendChild(row);
    
  }
  container.appendChild(table);
  const export_textarea = document.createElement("textarea");
  export_textarea.rows = 10;
  export_textarea.cols = 51;
  export_textarea.readOnly = true;
  container.appendChild(export_textarea);
  container.appendChild(document.createElement("br"));
  const button_export = document.createElement("button");
  button_export.innerText = "Export Track JSON";
  button_export.addEventListener("click", () => {
    export_textarea.value = JSON.stringify(track);
  });
  container.appendChild(button_export);
  const button_clear = document.createElement("button");
  button_clear.innerText = "Clear Track and Close Builder";
  button_clear.addEventListener("click", () => {
    track.pieces = [];
    titlescreen();
  });
  container.appendChild(button_clear);
  return container;
}
