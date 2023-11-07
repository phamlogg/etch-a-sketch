const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "#000000";

const container = document.querySelector(".container");
const colorPicker = document.querySelector("#color-picker");
const newBtn = document.querySelector("#new");
const penBtn = document.querySelector("#pen");
const eraserBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
let size = DEFAULT_GRID_SIZE;
let currentColor = DEFAULT_COLOR;
let drawMode = true;
let eraseMode = false;

window.onload = () => {
  setup(DEFAULT_GRID_SIZE);
  colorPicker.value = DEFAULT_COLOR;
  colorPicker.addEventListener('change', updateColor);
  penBtn.setAttribute('disabled', '');
};

function updateColor(event) {
  currentColor = event.target.value;
}

function setup(size) {
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.toggle("square");
    square.setAttribute(
      "style",
      `width: ${500 / size}px; height: ${500 / size}px;`,
    );

    square.addEventListener('click', () => {
      if (drawMode) {
        square.style.backgroundColor = currentColor;
      } 
      else if (eraseMode) {
        square.style.backgroundColor = "#222336";
      }
    })

    container.appendChild(square);
  }
}

newBtn.addEventListener("click", () => {
  size = newSketch();
  clear();
  setup(size);
});

penBtn.addEventListener('click', draw);
eraserBtn.addEventListener('click', erase);

clearBtn.addEventListener('click', clear);

function draw() {
  drawMode = true;
  eraseMode = false;
  penBtn.setAttribute('disabled', '');
  eraserBtn.removeAttribute('disabled');
}

function erase() {
  drawMode = false;
  eraseMode = true;
  penBtn.removeAttribute('disabled');
  eraserBtn.setAttribute('disabled', '');
}

function newSketch() {
  const num = parseInt(prompt("Number of squares per side: "));
  if (num <= 0 || num > 99) newSketch();
  else return num;
}

function clear() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  setup(size);
}
