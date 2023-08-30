"use strict";

let text = document.querySelector("#text");
let namE = document.querySelector("#name");
let date = document.querySelector("#date");
let error_text = document.querySelector("#error__text");
let error_name = document.querySelector("#error__name");

text.onblur = function () {
  adding_class(text, error_text);
};

text.oninput = function () {
  input_validation(text, namE, error_text);
};

namE.onblur = function () {
  adding_class(namE, error_name);
};

namE.oninput = function () {
  input_validation(namE, text, error_name);
};

function input_validation(elem, elem2, error) {
  if (elem.classList.contains("invalid")) {
    elem.classList.remove("invalid");
    error.innerHTML = "";
  }
  if (elem2.value) {
    document.querySelector("#submit_send").disabled = false;
  }
}

function adding_class(elem, error) {
  if (!elem.value || elem.value.search(/ /) == 0) {
    elem.value = "";
    elem.classList.add("invalid");
    error.innerHTML = "ОШИБКА! Поле не может быть пустым.";
    error.style.display = "block";
    document.querySelector("#submit_send").disabled = true;
  }
}

////////////////////////////////////////////////
const form = document.getElementById("form");
form.addEventListener("submit", getFormValue);

form.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    getFormValue();
  }
});

function getFormValue(event) {
  event.preventDefault();

  let dateNow = new Date();
  let dateYesterday = yesterday(dateNow);

  const data = {
    name: namE.value,
    text: text.value,
    date: date.value,
    hour: dateNow.getHours(),
    min: dateNow.getMinutes(),
  };

  namE.value = "";
  text.value = "";
  date.value = "";
  document.querySelector("#submit_send").disabled = true;

  createBlock(data, dateNow, dateYesterday);
}

function yesterday(date) {
  let copyDate = new Date(date);
  copyDate.setDate(date.getDate() - 1);
  return copyDate;
}

function dateСonversion(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  return `${y}-${addZero(m)}-${addZero(d)}`;
}

function addZero(value) {
  if (value < 10) {
    return `0${value}`;
  }
  return `${value}`;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createBlock(data, dateNow, dateYesterday) {
  let newCom = document.createElement("div");
  newCom.classList.add("list__body");

  let labelName = document.createElement("label");
  labelName.classList.add("list__name-user");
  labelName.textContent = data["name"];

  let labelDate = document.createElement("label");
  labelDate.classList.add("list__date");

  let time = `${addZero(data["hour"])}:${addZero(data["min"])}`;

  if (!data["date"] || dateСonversion(dateNow) === data["date"]) {
    labelDate.innerHTML = `сегодня, ${time}`;
  } else if (dateСonversion(dateYesterday) === data["date"]) {
    labelDate.innerHTML = `вчера, ${time}`;
  } else {
    let dateNew = data["date"].split("-").reverse().join(".");
    labelDate.innerHTML = `${dateNew}, ${time}`;
  }

  let textTA = document.createElement("div");
  textTA.classList.add("list__text");
  textTA.textContent = data["text"];

  let columnList = document.createElement("div");
  columnList.classList.add("list__column");

  let buttonBacket = document.createElement("button");
  buttonBacket.classList.add("list__basket");

  let buttonLike = document.createElement("button");
  buttonLike.style.backgroundImage = "url(img/like-2.svg)";
  buttonLike.classList.add("list__like");

  let commList = document.querySelector(".comments__list");
  commList.prepend(newCom);
  newCom.appendChild(labelName);
  newCom.appendChild(labelDate);
  newCom.appendChild(textTA);
  newCom.appendChild(columnList);
  columnList.appendChild(buttonBacket);
  columnList.appendChild(buttonLike);

  //////////////////////////////////////////////////////////////////
  let listCom = document.querySelector("#listCom");
  console.log(listCom);

  listCom.onclick = function (event) {
    if (
      event.target.className != "list__basket" &&
      event.target.className != "list__like"
    )
      return;

    if (event.target.className === "list__basket") {
      let listBody = event.target.closest(".list__body");
      listBody.remove();
    }

    if (event.target.className === "list__like") {
      console.log(event.target.style.backgroundImage);
      if (event.target.style.backgroundImage == 'url("img/like-2.svg")') {
        event.target.style.backgroundImage = "url(img/like1.svg)";
      } else {
        event.target.style.backgroundImage = "url(img/like-2.svg)";
      }
    }
  };
}
