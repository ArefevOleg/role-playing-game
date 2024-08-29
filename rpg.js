let xp = 0;
let health = 100;
let gold = 50;
let currentWeaponIndex = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'палка', power: 5 },
  { name: 'кинжал', power: 30 },
  { name: 'молоток-гвоздодер', power: 50 },
  { name: 'меч', power: 100 }
];
const locations = [
  {
    name: "городская площадь",
    "button text": ["Перейти в магазин", "Зайти в пещеру", "Сразиться с драконом"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Вы находитесь на городской площади. Вы видите вывеску с надписью \"Магазин\"."
  },
  {
    name: "магазин",
    "button text": ["Купить 10 единиц здоровья (10 золотых)", "Купить оружие (30 золотых)", "Идти на городскую площадь"],
    "button functions": [buyHealth, buyWeapon, goTown],
      text: "Вы входите в магазин."
  },
  {
    name: "пещера",
    "button text": ["Биться со слизнями", "Сразиться с клыкастым зверем", "Идти на городскую площадь"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "\"Ты входишь в пещеру. Ты видишь каких-то монстров\"."
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function fightDragon() {
  console.log("Fighting dragon.");
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "У тебя недостаточно золота, чтобы купить здоровье.";
  }
}
function buyWeapon() {
  if (gold >= 30) {
    gold -= 30;
    currentWeaponIndex++;
    goldText.innerText = gold;
    let newWeapon = weapons[currentWeaponIndex].name;
    text.innerText = "Теперь у вас есть " + newWeapon + ".";
  }
}

function fightSlime() {

}

function fightBeast() {

}