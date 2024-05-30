let messages = [];
let pfps = undefined;
fetch("https://danilionn.github.io/danis-bot-website/assets/pfps.json")
  .then((response) => response.json())
  .then((json) => {
    pfps = json;
  });

//console.log(pfps);
let letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
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

async function randomString(maxChars) {
  let string = "";

  let count = 0;
  let max = Math.floor(Math.random() * maxChars) + 1;
  console.log(maxChars, max);
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
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function createMessage() {
  let list = document.getElementById("chat");

  let message = document.createElement("li");
  let image = document.createElement("img");
  let font1 = document.createElement("span");
  let font2 = document.createElement("span");

  image.src = "assets/pfps/" + pfps[Math.floor(Math.random() * pfps.length)];
  image.width = 32;
  image.height = 32;
  image.style = "border-radius: 50%";
  font1.style = "color:grey; font-family: Roboto, Arial, sans-serif;";

  font1.id = "text1";

  font2.id = "text2";
  font2.style = "margin-left: 15px; font-family: Roboto, Arial, sans-serif;";
  font1.innerText = await randomString(7);
  font2.innerText = "     " + (await randomString(14));
  message.appendChild(image);
  message.appendChild(font1);
  message.appendChild(font2);

  list.appendChild(message);
  messages.unshift(message);
}

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("videoPlayer");

  setInterval(() => {
    if (!video.paused && video.currentTime > 29) {
      createMessage();
    }
  }, 414);

  setInterval(async () => {
    if (messages.length > 14) {
      if (messages[15]) {
        messages[15].remove();
        messages.splice(15, 1);
      }
    }
  }, 414);

  setInterval(async () => {
    if (!video.paused && video.currentTime > 29) {
      for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        let c = message.children;

        // console.log(c);

        c[1].innerText = await randomString(7);
        c[2].innerText = await randomString(14);
      }

      document.getElementById("viewers").innerText =
        numberWithCommas(Math.floor(Math.random() * 850_000)) +
        " watching now • Started streaming August 25, 2010";

      document.getElementById("subs").innerText =
        abbrNum(Math.floor(Math.random() * 850_000), 1) + " subscribers";
    }
  }, 414);
});
