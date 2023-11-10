const DEFAULT_GRID_SIZE = 16;
const DEFAULT_COLOR = "#000000";
const DEFAULT_BACKGROUND_COLOR = "#222336"

const body = document.querySelector("body");
const container = document.querySelector(".container");
const colorPicker = document.querySelector("#color-picker");
const newBtn = document.querySelector("#new");
const penBtn = document.querySelector("#pen");
const eraserBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");
const darkModeBtn = document.querySelector("#dark-mode");
const borderBtn = document.querySelector("#border");
let size = DEFAULT_GRID_SIZE;
let currentColor = DEFAULT_COLOR;
let currentBGColor = DEFAULT_BACKGROUND_COLOR;
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

    container.addEventListener('mousedown', () => {
      square.addEventListener('mousemove', handleMouseDown);
    })

    container.addEventListener('mouseup', () => {
      square.removeEventListener('mousemove', handleMouseDown);
    })

    container.addEventListener('mouseleave', () => {
      square.removeEventListener('mousemove', handleMouseDown);
    })

    container.appendChild(square);
  }
}

function handleMouseDown(event) {
  if (drawMode) {
    event.target.style.backgroundColor = currentColor;
  } else if (eraseMode) {
    event.target.style.backgroundColor = currentBGColor;
  }
}

newBtn.addEventListener("click", () => {
  size = newSketch();
  clear();
});

penBtn.addEventListener('click', draw);
eraserBtn.addEventListener('click', erase);
clearBtn.addEventListener('click', clear);

darkModeBtn.addEventListener('change', () => {
  if (darkModeBtn.checked) {
    currentBGColor = DEFAULT_BACKGROUND_COLOR;
    body.style.backgroundColor = currentBGColor;
    for (square of document.querySelectorAll(".square")) {
      if (square.style.backgroundColor === currentColor) {
        continue;
      } else { square.style.backgroundColor = currentBGColor; };
    }
  } else {
    currentBGColor = "white"
    body.style.backgroundColor = currentBGColor;
    for (square of document.querySelectorAll(".square")) {
      if (square.style.backgroundColor === currentColor) {
        continue;
      } else { square.style.backgroundColor = currentBGColor; };
    }
  }
})

borderBtn.addEventListener('change', () => {
  if (borderBtn.checked) {
    for (square of document.querySelectorAll(".square")) {
      square.style.border = "1px solid black";
    }
  } else {
    for (square of document.querySelectorAll(".square")) {
      square.style.border = "0px solid black";
    }
  }
})

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
