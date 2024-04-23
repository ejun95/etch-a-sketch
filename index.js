const container = document.querySelector(".container");

for(let i = 0; i < 16; i++) {
  let column = document.createElement("div")
  container.appendChild(column)
  for(let j = 0; j < 16; j++) {
    let div = document.createElement("div");
    div.className = "cell"
    div.setAttribute("class", "cell");

    div.addEventListener("mouseover", () => {
      div.style.backgroundColor = "blue";
    });
    column.appendChild(div);
  }
}