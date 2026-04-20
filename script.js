let areas = [];
let signs = [];
let items = [];
let enemies = [];
let currentArea = 0;
let inFight = "false";
let currentEnemy;

const player = {
    health: 30,
    maxHealth: 30,
    attackLow: 1,
    attackHigh: 3,
    defense: 0,
    weaponEquipped: "no",
    armorEquipped: "no",
}

areas[0] = new area("forest road", "road split", "city gate", "blocked", "blocked", "You are on a dirt road in the middle of a forest. Far behind you to the south is your former hometown, looted and burned to the ground.");
areas[1] = new area("road split", "guard checkpoint", "forest road", "training field", "blocked", "There is a fork in the road here, a sign stands at the intersection.");
areas[2] = new area("training field", "storage shed", "blocked", "blocked", "road split", "An abandoned training field, targets and training dummies litter the field. A small shed stands to the north.");
areas[3] = new area("storage shed", "blocked", "training field", "blocked", "blocked", "The shed is full of locked chests and lockers but there is a rack of training swords on the wall, you can probably take one.");
areas[4] = new area("guard checkpoint", "main highway", "road split", "blocked", "blocked", "The checkpoint is abandoned, the wooden gate has been smashed to pieces and there is a wolf in the corner eating what looks like a human leg.");

signs[1] = "North: guard checkpoint East: training field South: road to Wumphrey town";

items[0] = new item("training sword", 3, "weapon", "A blunt sword used by knights for practice, still hurts if it hits.", 0, 0, "storage shed")

enemies[0] = new enemy("wolf", "guard checkpoint", 3, 10, "none", "wolf pelt");

function item(name, value, type, description, inventory, equipped, place) {
    this.itemName = name;
    this.itemValue = value;
    this.itemType = type;
    this.itemDescription = description;
    this.itemInventory = inventory;
    this.itemEquipped = equipped;
    this.itemArea = place;
}

function area(name, north, south, east, west, description) {
    this.areaName = name;
    this.areaNorth = north;
    this.areaSouth = south;
    this.areaEast = east;
    this.areaWest = west;
    this.areaDescription = description;
}

function enemy(name, area, attack, health, effect, loot) {
    this.enemyName = name;
    this.enemyArea = area;
    this.enemyAttack = attack;
    this.enemyHealth = health;
    this.enemyEffect = effect;
    this.enemyLoot = loot;
}

function move() {
    let text = document.getElementById("skrivefelt").value;
    if (text === "n" && areas[currentArea].areaNorth != "blocked") {
        for (i = 0; i < areas.length; i++) {
            if (areas[currentArea].areaNorth === areas[i].areaName) {
                currentArea = i;
                let areaText = document.getElementById("firstImpression");
                areaText.textContent = areas[currentArea].areaDescription;
                break;
            }
            else { }
        }
    }
    else if (text === "s" && areas[currentArea].areaSouth != "blocked") {
        for (i = 0; i < areas.length; i++) {
            if (areas[currentArea].areaSouth === areas[i].areaName) {
                currentArea = i;
                let areaText = document.getElementById("firstImpression");
                areaText.textContent = areas[currentArea].areaDescription;
                break;
            }
            else { }
        }
    }
    else if (text === "e" && areas[currentArea].areaEast != "blocked") {
        for (i = 0; i < areas.length; i++) {
            if (areas[currentArea].areaEast === areas[i].areaName) {
                currentArea = i;
                let areaText = document.getElementById("firstImpression");
                areaText.textContent = areas[currentArea].areaDescription;
                break;
            }
            else { }
        }
    }
    else if (text === "w" && areas[currentArea].areaWest != "blocked") {
        for (i = 0; i < areas.length; i++) {
            if (areas[currentArea].areaWest === areas[i].areaName) {
                currentArea = i;
                let areaText = document.getElementById("firstImpression");
                areaText.textContent = areas[currentArea].areaDescription;
                break;
            }
            else { }
        }
    }
    else {
        let areaText = document.getElementById("firstImpression");
        areaText.textContent = "The way is blocked";
    }
}

function look() {
    let text = document.getElementById("skrivefelt").value;
    if (text.endsWith("sign") && areas[currentArea].areaDescription.search("sign") != -1) {
        let looktext = document.getElementById("lookOutput");
        looktext.textContent = "The sign says: '" + signs[currentArea] + "'";
    }
    else {
        for (i = 0; i < items.length; i++) {
            if (text.search(items[i].itemName) != -1 && items[i].itemInventory === 1) {
                let looktext = document.getElementById("lookOutput");
                looktext.textContent = items[i].itemDescription;
            }
            else { }
        }
    }
}

function fight() {
    let text = document.getElementById("skrivefelt").value;
    for (i = 0; i < enemies.length; i++) {
        if (text.search(enemies[i].enemyName) != -1 && enemies[i].enemyArea === areas[currentArea].areaName) {
            inFight = "true";
            currentEnemy = i;
            let enemyDescription = document.getElementById("firstImpression");
            let enemyStatus = document.getElementById("enemyText");
            let playerStatus = document.getElementById("playerText");
            enemyDescription.textContent = "You are fighting a " + enemies[currentEnemy].enemyName;
            enemyStatus.textContent = enemies[currentEnemy].enemyName + " has " + enemies[currentEnemy].enemyHealth + " HP";
            playerStatus.textContent = "You have " + player.health + "/" + player.maxHealth + " HP";
        }
        else { }
    }
}


function attack() {
    let fightText = document.getElementById("actionText");
    let enemyStatus = document.getElementById("enemyText");
    let playerStatus = document.getElementById("playerText");
    enemies[currentEnemy].enemyHealth = enemies[currentEnemy].enemyHealth - (Math.floor(Math.random() * (player.attackHigh - player.attackLow + 1)) + player.attackLow);
    if (enemies[currentEnemy].enemyHealth <= 0) {
        
        inFight = "false";
    }
    else {
        player.health = player.health - enemies[currentEnemy].enemyAttack;
        fightText.textContent = "The " + enemies[currentEnemy].enemyName + " hits you for " + enemies[currentEnemy].enemyAttack + " damage";
        if (player.health <= 0) {
            //insert game over here
        }
        else {
            enemyStatus.textContent = enemies[currentEnemy].enemyName + " has " + enemies[currentEnemy].enemyHealth + " HP";
            playerStatus.textContent = "You have " + player.health + "/" + player.maxHealth + " HP";
        }
    }
}

function take() {
    let text = document.getElementById("skrivefelt").value;
    for (i = 0; i < items.length; i++) {
        if (text.search(items[i].itemName) != -1 && items[i].itemArea === areas[currentArea].areaName) {
            items[i].itemInventory = 1;
            let takeText = document.getElementById("actionText");
            takeText.textContent = "You take the " + items[i].itemName + " and add it to your inventory";
        }
        else { }
    }
}

function equip() {
    let text = document.getElementById("skrivefelt").value;
    let equipText = document.getElementById("actionText");
    for (i = 0; i < items.length; i++) {
        if (text.search(items[i].itemName) != -1 && items[i].itemInventory === 1) {
            if (items[i].itemEquipped === 0 && items.itemType != "unequippable") {
                if (items[i].itemType === "weapon") {
                    if (player.weaponEquipped === "yes") {
                        for (o = 0; o < items.length; o++) {
                            if (items[o].itemType === "weapon" && items[o].itemEquipped === 1) {
                                items[o].itemEquipped === 0;
                                player.attackLow = player.attackLow - items[o].itemValue;
                                player.attackHigh = player.attackHigh - items[o].itemValue;
                                items[i].itemEquipped = 1;
                                player.attackLow = player.attackLow + items[i].itemValue;
                                player.attackHigh = player.attackHigh + items[i].itemValue;
                            }
                            else {}
                        }
                    }
                    else {
                        player.weaponEquipped = "yes";
                        items[i].itemEquipped = 1;
                        player.attackLow = player.attackLow + items[i].itemValue;
                        player.attackHigh = player.attackHigh + items[i].itemValue;
                    }
                }
                else if (items[i].itemType === "armor") {
                    if (player.armorEquipped === "yes") {
                        for (o = 0; o < items.length; o++) {
                            if (items[o].itemType === "armor" && items[o].itemEquipped === 1) {
                                items[o].itemEquipped = 0;
                                player.defense = player.defense - items[o].itemValue;
                                items[i].itemEquipped = 1;
                                player.defense = player.defense + items[i].itemValue;
                            }
                            else {}
                        }
                    }
                    else {
                        player.armorEquipped = "yes";
                        items[i].itemEquipped = 1;
                        player.defense = player.defense + items[i].itemValue;
                    }
                }
            }
        }
        else if (items[i].itemEquipped === 1) {
            equipText.textContent = items[i].itemName + " is already equipped."
            break;
        }
        else {
            equipText.textContent = items[i].itemName + " can not be equipped."
            break;
        }
    }   
}




document.getElementById("knapp").addEventListener("click", () => {
    let text = document.getElementById("skrivefelt").value;
    if (inFight === "true") {
        switch (true) {
            case (text === "a"):
                attack();
                break;
            case (text === "i"):
                
                break;
            case (text === "r"):
                
                break;
        }
    }
    else {
        switch (true) {
            case (text === "n" || text === "s" || text === "e" || text === "w"):
                move();
                break;
            case (text.startsWith("look") || text.startsWith("Look")):
                look();
                break;
            case (text.startsWith("fight") || text.startsWith("Fight")):
                fight();
                break;
            case (text.startsWith("take") || text.startsWith("Take")):
                take();
                break;
            case (text.startsWith("equip") || text.startsWith("Equip")):
                equip();
                break;
            case (text === "i"):
                
                break;
        }
    }
})