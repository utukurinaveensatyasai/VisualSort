"use strict";

const start = async () => {
  document.querySelector(".footer > p:nth-child(1)").style.visibility = "hidden";
  let now = new Date();

  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Math.max(Number(document.querySelector(".speed-menu").value), 1);

  if (!algoValue) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  const algorithms = {
    1: "BubbleSort",
    2: "SelectionSort",
    3: "InsertionSort",
    4: "MergeSort",
    5: "QuickSort",
    6: "HeapSort",
    7: "RadixSort"
  };

  if (algorithms[algoValue]) {
    await algorithm[algorithms[algoValue]]();
  } else {
    alert("Invalid Algorithm Selected");
  }

  let now1 = new Date();
  document.getElementById('Ttime').innerHTML = (now1 - now) / 1000;
};

let input = "";

const RenderScreen = async () => {
  await RenderList();
};

const RenderInput = async () => {
  let inpBox = document.querySelector(".inputBox");
  if (!inpBox) {
    console.error("Input box not found!");
    return;
  }

  input = inpBox.value.trim(); // Update the input globally
  console.log("User input:", input);
  await RenderList(); // Update visualization
};

const RenderList = async () => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");

  list.forEach(element => {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  });
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  list.forEach(element => {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  });

  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = [];
  let lowerBound = 1, upperBound = 100;

  let inpBox = document.querySelector(".inputBox");
  let inputReceived = inpBox ? inpBox.value.trim() : "";

  if (inputReceived.length > 0) {
    list = inputReceived.split(',')
      .map(num => Number(num.trim()))
      .filter(num => !isNaN(num));
  } else {
    list = Array.from({ length: Length }, () => 
      Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound)
    );
  }

  return list.length ? list : [10, 20, 30, 40, 50]; // Default array if input is invalid
};

const clearScreen = async () => {
  document.querySelector(".array").replaceChildren();
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  Navbar.classList.toggle("responsive");
};

// Event Listeners
document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderList);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
document.querySelector(".inputBox").addEventListener("change", RenderInput);
window.onload = RenderScreen;
