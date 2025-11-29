import { Application, Assets, Sprite } from "pixi.js";
import { Game } from "./gamestate";

async function titlescreen() {
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

  div_local_options.appendChild(document.createElement("hr"));
  div_local_options.appendChild(label_local_playercount);
  div_local_options.appendChild(input_local_playercount);
  div_local_options.appendChild(document.createElement("hr"));
  div_local_options.appendChild(label_local_lapcount);
  div_local_options.appendChild(input_local_lapcount);
  div_local_options.appendChild(document.createElement("hr"));
  container_local.appendChild(div_local_options);

  const button_local_start = document.createElement("button");
  button_local_start.innerText = "Start Game";
  button_local_start.id = "button_local_start";
  button_local_start.addEventListener("click", () => {
    const playercount = parseInt(
      (document.getElementById("input_local_playercount") as HTMLInputElement)
        .value,
      10,
    );
    local_game(playercount);
  });
  // end of local multiplayer

  container_local.appendChild(button_local_start);
  app.appendChild(container_local);
}

async function local_game(players: number) {
  const game = new Game();
  await game.init(players);

  game.app.ticker.add((time) => {
    game.tick(time);
  });
}
titlescreen();
