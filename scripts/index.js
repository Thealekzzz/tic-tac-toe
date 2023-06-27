const field = document.querySelector(".field");
const titleBG = document.querySelector(".title__bg");

const finishPopup = document.querySelector(".finish-popup");
const finishPopupTitle = document.querySelector(".finish-popup__title");

const closePopup = document.querySelector(".finish-popup__image");
const popupResetButton = document.querySelector(".finish-popup__reset-button");

const resetButton = document.querySelector(".reset-button");

let isXTurn = true;
let moves = 0;
let fieldData = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];



function checkField() {
  function swapRowsAndColumns(list) {
    const rows = list.length;
    const columns = list[0].length;

    // создаю новый список
    const new_list = Array.from({ length: columns }, () => []);

    // определяю новую позицию элемента и помещаем его в новый список
    list.map((row, i) => {
      row.reduce((_, item, j) => {
        new_list[j][i] = item;
      }, null);
    });

    return new_list;
  }

  if (fieldData.some(row => {
    // Совпадение в одном из рядов
    return row[0] === row[1] && row[1] === row[2] && row[2] !== "";
  })) {
    return true;

  } else if (swapRowsAndColumns(fieldData).some(row => {
    // Совпадение в одном из столбцов
    return row[0] === row[1] && row[1] === row[2] && row[2] !== "";
  })) {
    return true;

  } else if (fieldData[0][0] === fieldData[1][1] && fieldData[1][1] === fieldData[2][2] && fieldData[2][2] !== "") {
    return true;

  } else if (fieldData[0][2] === fieldData[1][1] && fieldData[1][1] === fieldData[2][0] && fieldData[2][0] !== "") {
    return true;

  }

  return false
}

function handleCellClick(evt) {
  function renderCellImage() {
    const img = document.createElement("img");

    img.classList.add("field__image");
    img.src = isXTurn ? "./images/X.svg" : "./images/O.svg";

    evt.target.appendChild(img);
  }

  moves++;
  const cellRow = evt.target.getAttribute("r");
  const cellCol = evt.target.getAttribute("c");
  fieldData[cellRow][cellCol] = isXTurn ? "x" : "o";

  evt.target.removeEventListener("click", handleCellClick);

  renderCellImage();

  if (checkField()) {
    handleGameEnd(true);
    return;

  } else if (moves === 9) {
    handleGameEnd(false);
    return;
  }

  isXTurn = !isXTurn;
}

function handleStartGame() {
  titleAnimation();
  finishPopup.classList.add("finish-popup_hidden");
  renderField();

  isXTurn = true;
  moves = 0;
  fieldData = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

}

function handleGameEnd(isWon) {

  finishPopup.classList.remove("finish-popup_hidden");
  if (isWon) {
    finishPopupTitle.textContent = `Победили ${isXTurn ? "крестики" : "нолики"}!`

  } else {
    finishPopupTitle.textContent = "Ничья!"

  }
}

function renderField() {
  field.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const fieldItem = document.createElement("div");

      fieldItem.classList.add("field__item");
      fieldItem.setAttribute("r", i);
      fieldItem.setAttribute("c", j);

      fieldItem.addEventListener("click", handleCellClick);

      field.appendChild(fieldItem);

    }
  }
}

function titleAnimation() {
  const colors = ["tomato", "seagreen", "orange", "lime", "violet"];
  const count = 10;
  const delay = 150;

  function applyStyles(styles) {
    Object.entries(styles).forEach(([key, value]) => {
      titleBG.style[key] = value;

    })
  }

  titleBG.style.display = "block";

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      applyStyles({
        "background-color": colors[Math.floor(Math.random() * colors.length)],
        "transform": `skew(${Math.floor(Math.random() * 10 - 5)}deg) translate(${Math.floor(Math.random() * 60 - 30)}px, ${Math.floor(Math.random() * 20 - 10)}px)`,
        "scale": (1 + Math.random() / 8).toFixed(1),
        "border-radius": Math.floor(Math.random() * 3) + "px"
      });

    }, delay * i);
  }

  setTimeout(() => {
    titleBG.style.display = "none";
  }, count * delay);


}


closePopup.addEventListener("click", () => {
  finishPopup.classList.add("finish-popup_hidden");

});

resetButton.addEventListener("click", handleStartGame);

popupResetButton.addEventListener("click", handleStartGame);


handleStartGame();