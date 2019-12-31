// DOM elements
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
// const mainIcon = document.getElementById("main-icon");
//const name = document.getElementById("name");
const focus = document.getElementById("focus");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

window.addEventListener("load", () => {
  let long, lat;
  const proxy = "https://cors-anywhere.herokuapp.com/";
  let api = `${proxy}https://api.darksky.net/forecast/148e03bac53ba45c90e6d64486bc1e62/37.8267,-122.4233`;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      api = `${proxy}https://api.darksky.net/forecast/148e03bac53ba45c90e6d64486bc1e62/${lat},${long}`;
    });
  } else {
    h1.textContent = "Not allowed";
  }

  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
});

// show time
function showTime() {
  let today = new Date();
  //timey = today.getTime,
  let hour = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  //set AM or PM
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12 Format
  hour = hour % 12 || 12;

  //Output
  //   time.innerHTML = `${hour}<span>:<span>${addZero(min)}<span>:<span>${addZero(
  //     sec
  //   )}`;
  time.innerHTML = `${hour}<span>:<span>${addZero(min)}`;

  setTimeout(showTime, 1000);
}

//Zero
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

//set background
function setGreeting() {
  let today = new Date();
  let hour = today.getHours();

  if (hour < 12) {
    greeting.textContent = "Good morning!";
    // mainIcon.src = `img/ante-meridiem.svg`
  } else if (hour < 18) {
    greeting.textContent = "Good afternoon!";
    // mainIcon.src = `img/post-meridiem.svg`
  } else {
    greeting.textContent = "Good evening!";
    // mainIcon.src = `img/post-meridiem_evening.svg`
  }
}

//Get name
// function getName() {
//   if (localStorage.getItem("name") === null) {
//     name.textContent = "Friend";
//   } else {
//     name.textContent = localStorage.getItem("name");
//   }
// }
//Set name
// function setName(e) {
//   if (e.type === "keypress") {
//     if (e.which === 13 || e.keyCode === 13) {
//       localStorage.setItem("name", e.target.innerText);
//       name.blur();
//     }
//   } else {
//     localStorage.setItem("name", e.target.innerText);
//   }
// }

//Get focus
function getFocus() {
  if (
    localStorage.getItem("focus") === null ||
    localStorage.getItem("focus") === ""
  ) {
    focus.textContent = "Please add a task";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

//set focus
function setFocus(e) {
  if (e.type === "keypress") {
    if (e.which === 13 || e.keyCode === 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

//Get focus
async function getMantra() {
  const response = await fetch("js/quotes.json");
  const myJson = await response.json();
  const myJsonSize = JSON.stringify(myJson).length;
  console.log(myJsonSize);
  num = Math.floor(Math.random() * Math.floor(100));
  console.log(num);

  if (myJson[num].text === null || myJson[num].from === null) {
    quote.textContent =
      "A hero is one who knows how to hang on for one minute longer.";
    author.textContent = "Norwegian proverb";
  } else {
    quote.textContent = myJson[num].text;
    author.textContent = myJson[num].from;
  }
  //   if ( === null || mantraData.text) {
  //     mantra.textContent = "Inhale love. Exhale gratitude.";
  //   } else {

  //var json = JSON.parse(myJson);

  //console.log(myJson);
  // console.log(JSON.stringify(myJson[num].from));
  //console.log(JSON.stringify(myJson).length);

  //}
}

//name.addEventListener("keypress", setName);
//name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

//run
getFocus();
showTime();
setGreeting();
//getName();
getMantra();

//foobar()
