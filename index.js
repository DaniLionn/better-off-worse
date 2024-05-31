const bpm = 145;
const messageLimit = 12;

const tick = 60_000 / bpm;
let totalTicks = 0;
let messages = [];
let video, subCount, viewers;

let pfps;

fetch("https://danilionn.github.io/danis-bot-website/assets/pfps.json")
  .then((response) => response.json())
  .then((json) => {
    pfps = json;
  });

const gravatarTypes = [
  "identicon",
  "monsterid",
  "wavatar",
  "retro",
  "robohash",
];

const abbrNum = (number, decPlaces) => {
  decPlaces = Math.pow(10, decPlaces);

  var abbrev = ["K", "M", "B", "T"];

  for (var i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
};
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function randomString(maxChars) {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  let string = "";

  let count = 0;
  let max = Math.floor(Math.random() * maxChars) + 1;

  while (count < max) {
    let newLetter = letters[Math.floor(Math.random() * letters.length)];

    if (Math.random() >= 0.5) {
      newLetter = newLetter.toUpperCase();
    }

    string += newLetter;
    count++;
  }

  return string;
}

async function mainLoop() {
  async function createMessage() {
    let list = document.getElementById("chat");

    let message = document.createElement("li");
    let image = document.createElement("img");
    let font1 = document.createElement("span");
    let font2 = document.createElement("span");

    let user = await randomString(7);
    let msg = await randomString(14);

    image.src = "assets/pfps/" + pfps[Math.floor(Math.random() * pfps.length)];
    image.width = 32;
    image.height = 32;
    image.style = "border-radius: 50%";
    font1.style = "color:grey; font-family: Roboto, Arial, sans-serif;";

    font1.id = "text1";

    font2.id = "text2";
    font2.style = "margin-left: 15px; font-family: Roboto, Arial, sans-serif;";
    font1.innerText = user;
    font2.innerText = "     " + msg;
    message.appendChild(image);
    message.appendChild(font1);
    message.appendChild(font2);
    list.appendChild(message);
    messages.unshift(message);
  }

  if (!video.paused && video.currentTime >= 30) {
    if (totalTicks % 2) {
      createMessage();
    }

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      let c = message.children;

      c[1].innerText = await randomString(7);
      c[2].innerText = await randomString(14);
    }

    viewers.innerText =
      numberWithCommas(Math.floor(Math.random() * 850_000)) +
      " watching now • Started streaming August 25, 2010";

    subCount.innerText =
      abbrNum(Math.floor(Math.random() * 850_000), 1) + " subscribers";
  }

  if (messages.length > messageLimit) {
    if (messages[messageLimit + 1]) {
      messages[messageLimit + 1].remove();
      messages.splice(messageLimit + 1, 1);
    }
  }

  totalTicks++;
}

document.addEventListener("DOMContentLoaded", function () {
  video = document.getElementById("videoPlayer");
  subCount = document.getElementById("subs");
  viewers = document.getElementById("viewers");

  setInterval(mainLoop, tick);
});
