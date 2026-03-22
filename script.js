const img = document.getElementById("movable-img");
const zoomText = document.getElementById("zoom-text");
const navbar = document.getElementById("navbar");
const header = document.getElementById("top-header");

let posX = 150;
let posY = 150;
let scale = 1;

let dragging = false;
let dragReady = false;

let startX, startY, startPX, startPY;
let lastDragY = 0;

/* APPLY */
function update() {
  img.style.left = posX + "px";
  img.style.top = posY + "px";
  img.style.transform = `scale(${scale})`;
  zoomText.innerText = Math.round(scale * 100) + "%";
}
update();

/* ZOOM BUTTON */
function zoomBy(val) {
  scale += val;
  scale = Math.max(0.5, Math.min(3, scale));
  update();
}

/* ✅ ZOOM ONLY ON IMAGE */
img.addEventListener("wheel", (e) => {
  e.preventDefault();
  zoomBy(e.deltaY < 0 ? 0.1 : -0.1);
});

/* ENABLE DRAG */
img.addEventListener("dblclick", () => {
  dragReady = true;
});

/* START DRAG */
img.addEventListener("mousedown", (e) => {
  if (!dragReady) return;

  dragging = true;
  startX = e.clientX;
  startY = e.clientY;
  startPX = posX;
  startPY = posY;

  lastDragY = e.clientY;

  img.style.cursor = "grabbing";
});

/* MOVE */
window.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  posX = startPX + (e.clientX - startX);
  posY = startPY + (e.clientY - startY);

  /* NAVBAR DRAG CONTROL */
  if (Math.abs(e.clientY - lastDragY) > 3) {
    if (e.clientY < lastDragY) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
  }

  lastDragY = e.clientY;

  update();
});

/* STOP */
window.addEventListener("mouseup", () => {
  dragging = false;
  img.style.cursor = "grab";
});

/* DISABLE DRAG */
window.addEventListener("click", (e) => {
  if (!img.contains(e.target)) {
    dragReady = false;
  }
});

/* 🔥 STICKY HEADER (SCROLL ONLY) */
let lastScroll = 0;

window.addEventListener("scroll", () => {
  let current = window.scrollY;

  if (current > 100 && current > lastScroll) {
    header.classList.add("show");
    navbar.classList.add("shift");
  } else {
    header.classList.remove("show");
    navbar.classList.remove("shift");
  }

  lastScroll = current;
});