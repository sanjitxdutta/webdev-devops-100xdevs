const screen = document.getElementById("main-screen");
const colorPanel = document.getElementById("color-panel");

// Change background on button click
colorPanel.addEventListener("click", function (e) {
  if (e.target.classList.contains("color-button")) {
    const color = e.target.getAttribute("data-color");
    screen.style.backgroundColor = color;
  }
});

// Add custom color button
function addCustomColor() {
  const colorInput = document.getElementById("customColorInput");
  const hex = colorInput.value.trim();
  if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
    const button = document.createElement("button");
    button.className = "color-button";
    button.style.backgroundColor = hex;
    button.setAttribute("data-color", hex);
    button.textContent = hex.toUpperCase();
    colorPanel.insertBefore(button, colorPanel.lastElementChild);
    colorInput.value = "";
  } else {
    alert("Enter a valid hex code (e.g., #FF5733)");
  }
}