const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "black";
const DEFAULT_BG_COLOR = "white";

let size = DEFAULT_GRID_SIZE;
let draw = true;
let erase = false;

const container = document.querySelector(".container");

window.onload = () => {
  setup(DEFAULT_GRID_SIZE);
};

function setup(size) {
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.toggle("square");
    square.setAttribute(
      "style",
      `width: ${500 / size}px; height: ${500 / size}px;`,
    );
    container.appendChild(square);
  }
}

const squares = document.querySelectorAll(".square");
squares.forEach((square) => square.addEventListener("click"));

const button = document.querySelector("button");
const pen = document.querySelector("#pen");
const eraser = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");

button.addEventListener("click", () => {
  size = newSketch();
  clear();
  setup(size);
});

pen.addEventListener("click", () => {
  pen.setAttribute("disabled", "");
  eraser.removeAttribute("disabled");
});

eraser.addEventListener("click", () => {
  eraser.setAttribute("disabled", "");
  pen.removeAttribute("disabled");
});

clearBtn.addEventListener("click", () => {
  clear();
  setup(size);
});

function newSketch() {
  const num = parseInt(prompt("Number of squares per side: "));
  if (num <= 0 || num > 99) newSketch();
  else return num;
}

function clear() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
