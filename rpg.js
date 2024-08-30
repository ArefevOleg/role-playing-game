let xp = 0;
let health = 100; // здоровье
let gold = 50; // золото
let currentWeaponIndex = 0; // Индекс текущего оружия
let fighting; // боевые действия
let monsterHealth; // здоровье монстров
let inventory = ['палка']; // инвентарь

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

const monsters = [
  {
    name: " слизь ",
    level: 2,
    health: 15,
  },{
    name: " клыкастый зверь ",
    level: 8,
    health: 60,
  },{
    name: " дракон ",
    level: 20,
    health: 300,
  },
]

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
  },
  {
    name: "сражаться",
    "button text": ["Атакой", "Уклонением", "Бегом"],
    "button functions": [attack, dodge, goTown],
    text: "Вы сражаетесь с монстром"
  },
  {
    name: "убить монстра",
    "button text": ["Перейти на городскую площадь", "Перейти на городскую площадь", "Перейти на городскую площадь"],
    "button functions": [goTown, goTown, goTown],
    text: 'Монстр кричит "Arg!" умирая. Вы получаете очки опыта и находите золото'
  },
  {
    name: "потерять",
    "button text": ["ВОСПРОИЗВЕСТИ?", "ВОСПРОИЗВЕСТИ?", "ВОСПРОИЗВЕСТИ?"],
    "button functions": [restart, restart, restart],
    text: "Ты умрешь. &#x2620;"
  },
  {
    name: "победа",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "Вы победили дракона! ВЫ ПРОШЛИ ИГРУ! &#x1F389;"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none"
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
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
 if (currentWeaponIndex < weapons.length) {
   if (gold >= 30) {
     gold -= 30;
     currentWeaponIndex++;
     goldText.innerText = gold;
     let newWeapon = weapons[currentWeaponIndex].name;
     text.innerText = "Теперь у вас есть " + newWeapon + ".";
     inventory.push(newWeapon)
     text.innerText += " В вашем инвентаре есть: " + inventory;
   } else {
     text.innerText = "У вас недостаточно золота для покупки оружия."
   }
 } else {
   text.innerText = " У вас уже есть самое мощное оружие! "
   button2.innerText = " Продать оружие за 15 золотых ";
   button2.onclick = sellWeapon
 }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = " Вы продали " + currentWeapon + ".";
    text.innerText += " В вашем инвентаре есть: " + inventory;
  } else {
    text.innerText = " Не продавайте свое единственное оружие! ";
  }
}

function fightSlime() {
  fighting = 0;
  goFight()
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3])
  monsterHealth = monsters[fighting].health
  const monsterStats = document.querySelector('monsterStats');
  monsterStats.style.display = 'block';
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = monsters[fighting].name + " атакует. "
  text.innerText += " Вы атакуете его своим " + weapons[currentWeaponIndex].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  }
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame()
    } else {
      defeatMonster();
    }
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  return hit > 0 ? hit : 0;
}

function dodge() {
  text.innerText = "Вы уклоняетесь от атаки " + monsters[fighting].name;
}

function defeatMonster() {
  gold = gold += Math.floor(monsters[fighting].level * 6.7)
  xp = xp += monsters[fighting].level;
  goldText.innerText = gold
  xpText.innerText = xp
  update(locations[4])
}

function lose() {
  update(locations[5])
}

function winGame() {
  update(locations[6]);
}

function restart() {
  currentWeaponIndex = 0
  inventory = ["stick"]
  xp = 0;
  health = 100;
  gold = 50;
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown()
}