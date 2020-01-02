// DOM elements
const time = document.getElementById("time");
const greeting = document.getElementById("greeting");
// const mainIcon = document.getElementById("main-icon");
//const name = document.getElementById("name");
const focus = document.getElementById("focus");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

const temperatureDescription = document.querySelector(
  ".temperature-decription"
);
const temperatureDegree = document.querySelector(".temperature-degree");
const locationTimezone = document.querySelector(".location-timezone");
const temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector(".temperature span");
const temperatureF = document.querySelector(".degree-section > span");
const newTime = document.querySelector(".new-time");

window.addEventListener("load", () => {
  let long, lat;
  const proxy = "https://cors-anywhere.herokuapp.com/";
  let api = `${proxy}https://api.darksky.net/forecast/148e03bac53ba45c90e6d64486bc1e62/39.530895,-119.814972`;

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     // long = position.coords.longitude;
  //     // lat = position.coords.latitude;

  //     // api = `${proxy}https://api.darksky.net/forecast/148e03bac53ba45c90e6d64486bc1e62/${lat},${long}`;
  //     api = `${proxy}https://api.darksky.net/forecast/148e03bac53ba45c90e6d64486bc1e62/${-119.814972},${-119.814972}`;
  //   });
  // }

  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      // const { temperature, summary, icon } = data.currently;
      const { temperature, time } = data.currently;
      const { summary, icon } = data.hourly;

      temperatureDegree.textContent = Math.round(temperature);
      temperatureDescription.textContent = summary;
      locationTimezone.textContent = data.timezone;

      // Time
      localTime = new Date(time);
      // const amPm = hour >= 12 ? "PM" : "AM";
      let hour = localTime.getHours();
      let minutes = localTime.getMinutes();
      // 12 Format
      hour = hour % 12 || 12;
      console.log(hour);
      newTime.innerHTML = `${hour}<span>:</span>${minutes} <span>${
        hour < 18 && hour > 12 ? " AM" : " PM"
      }</span>`;

      console.log(icon);
      let newword = icon.replace(/-/g, " ").toUpperCase();
      console.log(newword);
      console.log(wordInString(newword, "cloudy"));

      if (wordInString(newword, "cloudy")) {
        setInterval(drawFlakes, 30);
      }
      // setIcons
      setIcons(icon, document.querySelector(".icon"));

      let celsius = Math.round((temperature - 32) * (5 / 9));

      temperatureF.addEventListener("click", () => {
        console.log(temperatureF);
        if (temperatureF.innerHTML === "F") {
          temperatureSpan.textContent = "C";
          temperatureDegree.innerHTML = celsius;
        } else if (temperatureF.innerHTML === "C") {
          temperatureSpan.textContent = "F";
          temperatureDegree.innerHTML = Math.round(temperature);
        }
      });
    });

  // set skycons image
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function wordInString(s, word) {
    return new RegExp("\\b" + word + "\\b", "i").test(s);
  }

  /// Snow effect  //

  //Snow effect
  let canvas = document.getElementById("sky");
  let ctx = canvas.getContext("2d");

  let W = window.innerWidth;
  let H = window.innerHeight;

  canvas.width = W;
  canvas.height = H;

  let mf = 100;
  let flakes = [];

  for (let i = 0; i < mf; i++) {
    flakes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 5 + 2,
      d: Math.random() + 1
    });
  }
  // draw flakes
  function drawFlakes() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let i = 0; i < mf; i++) {
      let f = flakes[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    moveFlakes();
  }

  // animate flakes
  let angle = 0;

  function moveFlakes() {
    angle += 0.01;
    for (let i = 0; i < mf; i++) {
      let f = flakes[i];

      f.y += Math.pow(f.d, 2) + 1;
      f.x += Math.sin(angle) * 2;

      if (f.y > H) {
        flakes[i] = { x: Math.random() * W, y: 0, r: f.r, d: f.d };
      }
    }
  }
});

// // show time
// function showTime() {
//   let today = new Date();

//   let hour = today.getHours();
//   let min = today.getMinutes();
//   let sec = today.getSeconds();

//   //set AM or PM
//   const amPm = hour >= 12 ? "PM" : "AM";

//   // 12 Format
//   hour = hour % 12 || 12;

//   //Output
//   //   time.innerHTML = `${hour}<span>:<span>${addZero(min)}<span>:<span>${addZero(
//   //     sec
//   //   )}`;
//   time.innerHTML = `${hour}<span>:<span>${addZero(min)}<span>${(hour < 18 && hour > 12)? " AM":" PM" }</span>`;

//   setTimeout(showTime, 1000);
// }

//Zero
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}
//  set time
// function setAMPM(){
//   if (hour < 12) {
//   greeting.textContent = "Good morning!";
//   mainIcon.src = `img/ante-meridiem.svg`
// } else if (hour < 18) {
//   greeting.textContent = "Good afternoon!";
//   mainIcon.src = `img/post-meridiem.svg`
// } else {
//   greeting.textContent = "Good evening!";
//   mainIcon.src = `img/post-meridiem_evening.svg`
// }
// }

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
// function getFocus() {
//   if (
//     localStorage.getItem("focus") === null ||
//     localStorage.getItem("focus") === ""
//   ) {
//     focus.textContent = "Please add a task";
//   } else {
//     focus.textContent = localStorage.getItem("focus");
//   }
// }

//set focus
// function setFocus(e) {
//   if (e.type === "keypress") {
//     if (e.which === 13 || e.keyCode === 13) {
//       localStorage.setItem("focus", e.target.innerText);
//       focus.blur();
//     }
//   } else {
//     localStorage.setItem("focus", e.target.innerText);
//   }
// }

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
// focus.addEventListener("keypress", setFocus);
// focus.addEventListener("blur", setFocus);

//run
getMantra();
// setAMPM();
// getFocus();
// showTime();
setGreeting();
//getName();

//foobar()
