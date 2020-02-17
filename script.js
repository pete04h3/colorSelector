"use strict";

document.addEventListener("DOMContentLoaded", start);

let selectedColor;
const HTML = {};
const style = document.createElement("style");
document.head.appendChild(style);

function start() {
  console.log(start);

  HTML.colorPicker = document.querySelector("#color_picker");
  HTML.colorContainer = document.querySelector("#color");

  HTML.colorPicker.addEventListener("change", showColor);
}

function showColor() {
  selectedColor = HTML.colorPicker.value;

  HTML.colorContainer.dataset.color_selected = selectedColor;

  style.sheet.insertRule(`[data-color_selected="${selectedColor}"] {--selected_color: ${selectedColor}`);

  showHEX(selectedColor);
}

function showHEX(HEX) {
  document.querySelector("#hex").textContent = "HEX: " + HEX;

  console.log(HEX);
  convertHEX(HEX);
}

function convertHEX(HEX) {
  let r, g, b;

  r = HEX.substring(1, 3);
  g = HEX.substring(3, 5);
  b = HEX.substring(5, 7);

  r = Number.parseInt(r, 16);
  g = Number.parseInt(g, 16);
  b = Number.parseInt(b, 16);

  console.log(r, g, b);
  showRgb(r, g, b);
}

function showRgb(r, g, b) {
  document.querySelector("#rgb").textContent = `RGB: (${r}, ${g}, ${b})`;

  showHsl(r, g, b);
}

function showHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  document.querySelector("#hsl").textContent = `HSL: (${h}, ${s}%, ${l}%)`;

  console.log(h, s, l);
}
