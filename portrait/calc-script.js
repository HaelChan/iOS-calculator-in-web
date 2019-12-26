const screen = document.querySelector(".screen");
const clear = document.getElementById("clear");
let runningTotal;
let buffer;
let previousOperator;
let selectedOperator;
let containPeriod;
let isNonNegative;

init();

function init() {
  runningTotal = 0;
  buffer = "0";
  selectedOperator = null;
  previousOperator = null;
  containPeriod = false;
  isNonNegative = true;
}

document.querySelector('.buttons').addEventListener('click', (event) => {
  buttonClick(event.target.innerText);
})

function buttonClick(value) {
  // special case when clicking clearance among buttons
  if (value.length > 3) {
    return;
  }
  
  if (value !== "." && isNaN(parseInt(value))) {
    handleSymbol(value);
  }
  else {                      // value is '.' or '0'-'9'
    handleNumber(value);
  }
  rerender();
}

function handleSymbol(value) {
  switch (value) {
    case "AC":
      init();
      break;
    case "C":
      clear.innerText = "AC";
      buffer = "0";
      isNonNegative = true;
      break;
    case "+/-":
      isNonNegative = !isNonNegative;
      if (isNonNegative) {
        buffer = buffer.substr(1);
      }
      else {
        buffer = "-" + buffer;
      }
    default:
      break;
  }
}

function handleNumber(value) {
  clear.innerText = "C";
  if (value === ".") {
    addPeriod();
  }
  else {
    if (buffer === "0") {
      buffer = value;
    }
    else if (buffer === "-0") {
      buffer = "-" + value;
    }
    else {
      let digitNum = buffer.replace(/[,\.-]/g, "").length;
      if (digitNum < 9) {
        buffer += value;
        if (!containPeriod) {
          addComma();
        }
      }
    }
  }
}

function addComma() {
  buffer = buffer.replace(/[,-]/g, "");
  if (buffer.length > 6) {
    buffer = buffer.substr(0, buffer.length - 6) + "," + buffer.substr(buffer.length - 6, 3) + "," + buffer.substr(buffer.length - 3);
  } else if (buffer.length > 3) {
    buffer = buffer.substr(0, buffer.length - 3) + "," + buffer.substr(buffer.length - 3);
  }
  if (!isNonNegative) {
    buffer = "-" + buffer;
  }
}

function addPeriod() {
  if (!containPeriod && buffer.length < 11) {
    containPeriod = true;
    buffer += ".";
  }
}

function rerender() {
  screen.innerText = buffer;
}

