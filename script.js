// Your code here.
const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let selected = null;
let offsetX = 0;
let offsetY = 0;

items.forEach((item) => {
  // Make items absolutely positioned inside container
  item.style.position = "absolute";

  // Store initial position based on offsetLeft/Top
  const rect = item.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  item.style.left = `${rect.left - containerRect.left}px`;
  item.style.top = `${rect.top - containerRect.top}px`;

  // Handle drag start
  item.addEventListener("mousedown", (e) => {
    selected = item;
    const itemRect = selected.getBoundingClientRect();
    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    // Bring dragged item to top visually
    selected.style.zIndex = 1000;

    // Optional: Prevent default drag image ghost
    e.preventDefault();
  });
});

// Handle mouse move on the whole document
document.addEventListener("mousemove", (e) => {
  if (!selected) return;

  const containerRect = container.getBoundingClientRect();
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Clamp to keep inside container
  x = Math.max(0, Math.min(container.clientWidth - selected.offsetWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - selected.offsetHeight, y));

  selected.style.left = `${x}px`;
  selected.style.top = `${y}px`;
});

// Release item on mouseup
document.addEventListener("mouseup", () => {
  if (selected) {
    selected.style.zIndex = "";
  }
  selected = null;
});