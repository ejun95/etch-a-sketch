const grid = document.querySelector('.grid');
const reset = document.querySelector('#reset-button');
const showGrid = document.querySelector('#show-grid');
const input = document.querySelector('#gridSize');
const color_picker = document.querySelector('#color-picker');
const crazy_colors = document.querySelector('#crazy-colors');
const darken = document.querySelector('#darken');
const lighten = document.querySelector('#lighten');

const gridWidth = grid.getBoundingClientRect().width;
const gridHeight = grid.getBoundingClientRect().height

const DEFAULT_COLOR = 'black';
const DEFAULT_CELL_SIZE = 16;

let color = DEFAULT_COLOR;
let cellSize = DEFAULT_CELL_SIZE;
let userInput = input.value;
let isDarkening = false;
let isLightening = false;
let isMouseDown = false;

createGrid(DEFAULT_CELL_SIZE);

grid.querySelectorAll('.cell').forEach(toggleGridOff);

reset.addEventListener('click', () => {
  grid.querySelectorAll('.cell').forEach(resetColor);
  grid.querySelectorAll('.cell').forEach(resetOpacity);
  darken.checked = false;
  lighten.checked = false;
  isDarkening = false;
  isLightening = false;
  color = color_picker.value;
});

showGrid.addEventListener('change', () => {
  if(showGrid.checked) {
    grid.querySelectorAll('.cell').forEach(toggleGridOn);
  } else {
    grid.querySelectorAll('.cell').forEach(toggleGridOff);
  } 
});

input.addEventListener('input', () => {
  deleteGrid();
  userInput = input.value
  createGrid(userInput);
  showGrid.checked = false;
});

color_picker.addEventListener('change', () => {
  color = color_picker.value;
});

darken.addEventListener('change', () => {
  if(darken.checked) {
    isDarkening = true;
    color = 'none';
  } else {
    isDarkening = false;
    color = color_picker.value;
  }
});

lighten.addEventListener('change', () => {
  if(lighten.checked) {
    isLightening = true;
    color = 'none';
  } else {
    isLightening = false;
    color = color_picker.value;
  }
});

function onMouseHover(element) {
  element.addEventListener('mouseover', () => {
    if(crazy_colors.checked) {
      element.style.backgroundColor = generateRandomColor();
    } else {
      color = color_picker.value;
      element.style.backgroundColor = color;
    }

    if(isDarkening || isLightening) {
      element.style.opacity = changeOpacity(element);
    } 
  });
}

function createGrid(cellSize) {
  for(let i = 0; i < cellSize; i++) {
    let column = document.createElement('div')
    grid.appendChild(column)
    for(let j = 0; j < cellSize; j++) {
      let div = document.createElement('div');
      div.className = 'cell'
      div.style.opacity = 1;
      div.style.width = gridWidth / cellSize + 'px';
      div.style.height = gridHeight / cellSize + 'px';
  
      column.appendChild(div);
    }
  }
  grid.querySelectorAll('.cell').forEach(onMouseHover);
}

function deleteGrid() {
  while(grid.lastElementChild) {
    grid.removeChild(grid.lastElementChild);
  }
}

function resetColor(element) {
  element.style.backgroundColor = 'lightgrey';
}

function resetOpacity(element) {
  element.style.opacity = 1;
}

function toggleGridOn(element) {
  element.style.outline = '1px solid gray'
}

function toggleGridOff(element) {
  element.style.outline = '';
}

function changeOpacity(element) {
  if(isDarkening) {
    if(element.style.opacity != 0) {
      element.style.opacity -= .1;
    }
  } else if(isLightening) { 
    if(element.style.opacity != 1) {
      element.style.opacity = parseFloat(element.style.opacity) + .1;
    }
  }
}

function generateRandomColor() {
  return color = 'rgb(' + generateRandomNumber() + ',' +
 + generateRandomNumber() + ',' + generateRandomNumber() + ')'
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 256);
}