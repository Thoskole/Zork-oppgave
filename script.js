let areas = [];
let signs = [];
let items = [];
let enemies = [];
let quests = [];
let npcs = [];
let responses = [];
let currentArea = 0;
let inFight = "false";
let inTalk = "false";
let currentEnemy;
let currentTalk;
let output;

const player = {
    health: 30,
    maxHealth: 30,
    attackLow: 1,
    attackHigh: 3,
    defense: 0,
    weaponEquipped: "none",
    armorEquipped: "none",
}

areas[0] = new area("forest road", "road split", "city gate", "blocked", "blocked", "You are on a dirt road in the middle of a forest. Far behind you to the south is your former hometown, looted and burned to the ground.");
areas[1] = new area("road split", "guard checkpoint", "forest road", "training field", "blocked", "There is a fork in the road here, a sign stands at the intersection.");
areas[2] = new area("training field", "storage shed", "blocked", "blocked", "road split", "An abandoned training field, targets and training dummies litter the field. A small shed stands to the north.");
areas[3] = new area("storage shed", "blocked", "training field", "blocked", "blocked", "The shed is full of locked chests and lockers but there is a rack of training swords on the wall, you can probably take one.");
areas[4] = new area("guard checkpoint", "main highway beginning", "road split", "blocked", "blocked", "The checkpoint is abandoned, the wooden gate has been smashed to pieces and there is a wolf in the corner eating what looks like a human corpse. It hasn't noticed you yet.");
areas[5] = new area("main highway beginning", "main highway middle", "guard checkpoint", "blocked", "blocked", "This is the beginning of the main road, but calling it that might be too generous. The wide dirt road is littered with potholes and tracks from wagon wheels. It's a long way on foot so you better get walking.");
areas[6] = new area("main highway middle", "main highway end", "main highway beginning", "blocked", "blocked", "After hours of walking theres finally a landmark. A roadblock has been built here with a sign facing north, it looks newly built but there are no guards.");
areas[7] = new area("main highway end", "placeholder town south entrance", "main highway middle", "blocked", "blocked", "You can see placeholder town to the north, to the south is the long walk back to your destroyed hometown.");
areas[8] = new area("placeholder town south entrance", "placeholder town main square", "main highway end", "blocked", "placeholder inn lobby", "The guards let you through the gate without any problems, it doesn't seem like they know what happened to the south yet. There are many buildings on both sides of the road but one stands out; a large two story building with the word 'INN' on the front door. To the north and further into town is what looks like a large open plaza.");
areas[9] = new area("placeholder town main square", "placeholder town north entrance", "placeholder town south entrance", "placeholder town east entrance", "placeholder town west entrance", "The middle of town consists of a large open area with stalls around the edges. From here you can go north, east, south or west.");
areas[10] = new area("placeholder town north entrance", "north road", "placeholder town main square", "blocked", "blocked", "The northern part of town contains mostly what seems to be barracks and training fields for the guard. Past the gate to the north, a large mountain looms in the distance. To the south is the middle of town.");
areas[11] = new area("placeholder town east entrance", "placeholder general store", "blocked", "east road", "placeholder town main square", "The east of placeholder town has mostly storefronts and restaurants. East past the gates, the road continues through vast plains until it reaches the sea. You notice a general store to the north, there's a sign out front. To the west is the town center.");
areas[12] = new area("placeholder town west entrance", "blocked", "blocked", "placeholder town main square", "west road", "placeholder description");
areas[13] = new area("placeholder inn lobby", "blocked", "placeholder inn bedroom(closed)", "placeholder town south entrance", "blocked", "The inside of the inn has a cozy vibe, behind the counter is an older woman who smiles at you as you walk in. Only one table is occupied, a man is sitting in the far corner drinking, he looks like he is in a bad mood. To the south are a set of stairs leading to the second floor.");
areas[14] = new area("placeholder inn bedroom", "placeholder inn lobby", "blocked", "blocked", "blocked", "placeholder description");
areas[15] = new area("placeholder general store", "blocked", "placeholder town east entrance", "blocked", "blocked", "The store is filled with shelves packed full with anything from food to weapons, at the back is a counter with an old man behind it. This store might have things you need in your travels.");

signs[1] = "North: guard checkpoint. East: training field. South: road to Greenwood town.";
signs[6] = "Travel to Greenwood town is being temporarily halted for road repairs, it should open again by the end of the week.";
signs[11] = "Placeholder general store, the place where you can find anything and everything."

items[0] = new item("training sword", 3, "weapon", "A blunt sword used by knights for practice, still hurts if it hits.", 0, 0, "storage shed");
items[1] = new item("placeholder inn bedroom key", "You have to talk to the woman behind the counter to book a room", "key", "The key to your room in the placeholder inn", 0, "unequippable", "placeholder inn bedroom");

enemies[0] = new enemy("wolf", "guard checkpoint", 3, 10, "none", "wolf pelt", "The checkpoint is abandoned, the wooden gate has been smashed to pieces and there is a dead wolf in the corner next to a half eaten human corpse.");

quests[0] = new quest("Main quest", "story start", "???", "Go north to the next town and search for clues", 0 , "Find out why your hometown was destroyed");
quests[1] = new quest("Help the innkeeper", "placeholder town innkeeper", "A room at the inn", "Help the innkeeper", 0, "Help the innkeeper pick up her order");
quests[2] = new quest("Return to the innkeeper", "placeholder general store", "A room at the inn", "Return to the innkeeper", 0, "Help the innkeeper pick up her order");

npcs[0] = new npc("woman", "Hello and welcome to placeholder town inn, is there anything I can help you with?", "1. I need somewhere to rest but i'm broke, could i do any work for you in exchange for a room? 2. Have you seen anybody come through here, either to or from Greenwood town? 3. No sorry to bother you.", "placeholder inn lobby", "the innkeeper");
npcs[1] = new npc("man", "What do you want?", "1. I heard you tried to get to Greenwood, what happened? 2. Nothing sorry.", "placeholder inn lobby", "inn patron");
npcs[2] = new npc("old man", "Welcome esteemed customer, can I interest you in any of my wares?", "1. Buy Wooden bow - eight gold. 2. Buy Lantern - six gold. 3. Buy Red ring - nine gold. 4. Buy Red potion - two gold. 5. I am here to pick up the grocery order for placeholder inn.(hidden Help the innkeeper) 6. Not right now, thanks.", "placeholder general store", "the store owner");

responses[0] = new response("the innkeeper 1", "I might be able to help you, go to the general store and pick up my groceries. When you get back i'll lend you a room.", "none", "Help the innkeeper", "none", 0);
responses[1] = new response("the innkeeper 2", "That man in the corner has been staying at the inn for a couple of days waiting for the road to open, try asking him", "none", "none", "none", 0);
responses[2] = new response("inn patron 1", "Those bastards were blocking the road, said I had to wait a week for the road to be repaired. Don't know what the king's personal guards are doing fixing roads but what do I know. When I got back here this weird lady asked me to meet her in the camp west of the city but I didn't want any trouble so I haven't gone yet.", "none", "Main quest", "Talk to the lady in the camp west of placeholder town", 0)


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

function enemy(name, area, attack, health, effect, loot, defeat) {
    this.enemyName = name;
    this.enemyArea = area;
    this.enemyAttack = attack;
    this.enemyHealth = health;
    this.enemyEffect = effect;
    this.enemyLoot = loot;
    this.enemyDefeatDescription = defeat;
}

function quest(name, giver, reward, objective, status, description) {
    this.questName = name;
    this.questGiver = giver;
    this.questReward = reward;
    this.questObjective = objective;
    this.questStatus = status;
    this.questDescription = description;
}

function npc(name, talk, response, area, descriptor) {
    this.npcName = name;
    this.npcTalk = talk;
    this.npcResponse = response;
    this.npcArea = area;
    this.npcDescriptor = descriptor;
}

function response(name, content, questComplete, questGet, item, cost) { 
    this.responseName = name;
    this.responseContent = content;
    this.responseQuestComplete = questComplete;
    this.responseQuestGet = questGet;
    this.responseItem = item;
    this.responseCost = cost;
}

document.addEventListener("DOMContentLoaded", () => {
    let areaText = document.getElementById("firstImpression");
    areaText.textContent = areas[currentArea].areaDescription;
    output = "<p>You just barely escaped with your life by hiding in a collapsed building.</p>"
           + "<p>While hiding you observed that the people responsible for burning your town were clad in armor adorned with the crest of the king's personal guard.</p>"
           + "<p>Why would the king order your little backwater logging town to be destroyed.</p>"
           + "<p>You should see if anyone in the town to the north knows anything.</p>";
    info.insertAdjacentHTML("beforeend", output);
    quests[0].questStatus = 1;
    printStatus();
    printObjective();
})

function move() {
    let text = document.getElementById("textField").value;
    if (text === "n" && areas[currentArea].areaNorth != "blocked") {
        if (areas[currentArea].areaNorth.search("(closed)") != -1) {
            keyCheck();
        }
        else {
            for (i = 0; i < areas.length; i++) {
                if (areas[currentArea].areaNorth === areas[i].areaName) {
                    currentArea = i;
                    changeArea();
                    break;
                }
                else { }
            }
        }
    }
    else if (text === "s" && areas[currentArea].areaSouth != "blocked") {
        if (areas[currentArea].areaSouth.search("(closed)") != -1) {
            keyCheck();
        }
        else {
            for (i = 0; i < areas.length; i++) {
                if (areas[currentArea].areaSouth === areas[i].areaName) {
                    currentArea = i;
                    changeArea();
                    break;
                }
                else { }
            }
        }
    }
    else if (text === "e" && areas[currentArea].areaEast != "blocked") {
        if (areas[currentArea].areaEast.search("(closed)") != -1) {
            keyCheck();
        }
        else {
            for (i = 0; i < areas.length; i++) {
                if (areas[currentArea].areaEast === areas[i].areaName) {
                    currentArea = i;
                    changeArea();
                    break;
                }
                else { }
            }
        }
    }
    else if (text === "w" && areas[currentArea].areaWest != "blocked") {
        if (areas[currentArea].areaWest.search("(closed)") != -1) {
            keyCheck();
        }
        else {
            for (i = 0; i < areas.length; i++) {
                if (areas[currentArea].areaWest === areas[i].areaName) {
                    currentArea = i;
                    changeArea();
                    break;
                }
                else { }
            }
        }
    }
    else {
        output = "<p>You can't go that way</p>";
        info.insertAdjacentHTML("beforeend", output);
    }
}

function keyCheck() {
    for (i = 0; i < items.length; i++) {
        if (areas[currentArea].areaNorth.search(items[i].itemArea) != -1 && items[i].itemType === "key") {
            if (items[i].itemInventory === 1) {
                output = "<p>You use the " + items[i].itemName + "to unlock the door.</p>";
                info.insertAdjacentHTML("beforeend", output);
                for (o = 0; o < areas.length; o++) {
                    if (areas[currentArea].areaNorth.search(areas[o].areaName) != -1) {
                        currentArea = o;
                        changeArea();
                        break;
                    }
                    else {}
                }  
            }
            else {
                output = "<p>" + items[i].itemValue + "</p>";
                info.insertAdjacentHTML("beforeend", output);
            }
        }
        if (areas[currentArea].areaSouth.search(items[i].itemArea) != -1 && items[i].itemType === "key") {
            if (items[i].itemInventory === 1) {
                output = "<p>You use the " + items[i].itemName + "to unlock the door.</p>";
                info.insertAdjacentHTML("beforeend", output);
                for (o = 0; o < areas.length; o++) {
                    if (areas[currentArea].areaSouth.search(areas[o].areaName) != -1) {
                        currentArea = o;
                        changeArea();
                        break;
                    }
                    else {}
                }  
            }
            else {
                output = "<p>" + items[i].itemValue + "</p>";
                info.insertAdjacentHTML("beforeend", output);
            }
        }
        if (areas[currentArea].areaEast.search(items[i].itemArea) != -1 && items[i].itemType === "key") {
            if (items[i].itemInventory === 1) {
                output = "<p>You use the " + items[i].itemName + "to unlock the door.</p>";
                info.insertAdjacentHTML("beforeend", output);
                for (o = 0; o < areas.length; o++) {
                    if (areas[currentArea].areaEast.search(areas[o].areaName) != -1) {
                        currentArea = o;
                        changeArea();
                        break;
                    }
                    else {}
                }  
            }
            else {
                output = "<p>" + items[i].itemValue + "</p>";
                info.insertAdjacentHTML("beforeend", output);
            }
        }
        if (areas[currentArea].areaWest.search(items[i].itemArea) != -1 && items[i].itemType === "key") {
            if (items[i].itemInventory === 1) {
                output = "<p>You use the " + items[i].itemName + "to unlock the door.</p>";
                info.insertAdjacentHTML("beforeend", output);
                for (o = 0; o < areas.length; o++) {
                    if (areas[currentArea].areaWest.search(areas[o].areaName) != -1) {
                        currentArea = o;
                        changeArea();
                        break;
                    }
                    else {}
                }  
            }
            else {
                output = "<p>" + items[i].itemValue + "</p>";
                info.insertAdjacentHTML("beforeend", output);
            }
        }
    }
}

function changeArea() {
    info.removeChild(document.getElementById("firstImpression"));
    output = '<p id="firstImpression">' + areas[currentArea].areaDescription + "</p>";
    info.insertAdjacentHTML("beforeend", output);
}

function look() {
    let text = document.getElementById("textField").value;
    if (text.endsWith("sign") && areas[currentArea].areaDescription.search("sign") != -1) {
        output = "<p>The sign says: '" + signs[currentArea] + "'</p>";
        info.insertAdjacentHTML("beforeend", output);
    }
    else {
        for (i = 0; i < items.length; i++) {
            if (text.search(items[i].itemName) != -1 && items[i].itemInventory === 1) {
                output = "<p>" + items[i].itemDescription + "</p>";
                info.insertAdjacentHTML("beforeend", output);
            }
            else { }
        }
    }
}

function talk() {
    let text = document.getElementById("textField").value;
    text = text.substring(5);
    for (i = 0; i < npcs.length; i++) {
        if (text === npcs[i].npcName && areas[currentArea].areaDescription.search(npcs[i].npcName) != -1 && npcs[i].npcArea === areas[currentArea].areaName) {
            inTalk = "true";
            currentTalk = i;

            output = "<p>You talk to " + npcs[currentTalk].npcDescriptor + "</p>"
                   + "<p>" + npcs[currentTalk].npcTalk + "</p>";
            info.insertAdjacentHTML("beforeend", output);
            let n = 1;
            for (o = 1; npcs[currentTalk].npcResponse.search(o) != -1; o++) {
                if (npcs[currentTalk].npcResponse.search(o) != -1 && npcs[currentTalk].npcResponse.search(o + 1) != -1) {
                    //console.log("test search output");
                    let start = npcs[currentTalk].npcResponse.search(o);
                    let end = npcs[currentTalk].npcResponse.search(o + 1);
                    output = "<p>" + (n) + npcs[currentTalk].npcResponse.substring(start + 1, end) + "</p>";
                    if (output.search("hidden") != -1) {
                        for (q = 0; q < quests.length; q++) {
                            if (output.search(quests[q].questName) != -1 && quests[q].questStatus === 1) {
                                let end = npcs[currentTalk].npcResponse.search("(");
                                output = "<p>" + (n) + npcs[currentTalk].npcResponse.substring(start + 1, end) + "</p>";
                                info.insertAdjacentHTML("beforeend", output);
                            }
                            else {}
                        }
                    }
                    else {
                        info.insertAdjacentHTML("beforeend", output);
                        n++;
                    }
                }
                else if (npcs[currentTalk].npcResponse.search(o) != -1 && npcs[currentTalk].npcResponse.search(o + 1) == -1) {
                    let start = npcs[currentTalk].npcResponse.search(o);
                    output = "<p>" + (n) + npcs[currentTalk].npcResponse.substring(start + 1) + "</p>";
                    info.insertAdjacentHTML("beforeend", output);
                    n++;
                }
                else {}

            }
        }
        else {}
    }
}

function respond() {
    let text = document.getElementById("textField").value;
    for (i = 0; i < responses.length; i++) {
        if (responses[i].responseName.search(npcs[currentTalk].npcDescriptor) != -1 && responses[i].responseName.search(text) != -1) {
            output = "<p>" + responses[i].responseContent + "</p>";
            info.insertAdjacentHTML("beforeend", output);
            inTalk = "false"
            currentTalk = "none"
        }
        else {
            inTalk = "false";
            currentTalk = "none";
        }
    }
}

function fight() {
    let text = document.getElementById("textField").value;
    for (i = 0; i < enemies.length; i++) {
        if (text.search(enemies[i].enemyName) != -1 && enemies[i].enemyArea === areas[currentArea].areaName) {
            inFight = "true";
            currentEnemy = i;

            output = "<p>You are fighting a " + enemies[currentEnemy].enemyName + "</p>";
            info.insertAdjacentHTML("beforeend", output);

            output = "<p>" + enemies[currentEnemy].enemyName + " has " + enemies[currentEnemy].enemyHealth + " HP</p>";
            info.insertAdjacentHTML("beforeend", output);
        }
        else { }
    }
}


function attack() {

    let playerHit = (Math.floor(Math.random() * (player.attackHigh - player.attackLow + 1)) + player.attackLow);
    enemies[currentEnemy].enemyHealth = enemies[currentEnemy].enemyHealth - playerHit;

    output = "<p>You did " + playerHit + " damage to " + enemies[currentEnemy].enemyName + "</p>"
    info.insertAdjacentHTML("beforeend", output);

    if (enemies[currentEnemy].enemyHealth <= 0) {

        inFight = "false";

        output = "<p>You defeated " + enemies[currentEnemy].enemyName + "</p>";
        info.insertAdjacentHTML("beforeend", output);

        areas[currentArea].areaDescription = enemies[currentEnemy].enemyDefeatDescription;
        info.removeChild(document.getElementById("firstImpression"))
        output = '<p id="firstImpression">' + areas[currentArea].areaDescription; + "</p>"
        info.insertAdjacentHTML("beforeend", output);
    }
    else {
        player.health = player.health - enemies[currentEnemy].enemyAttack;
        output = "<p>The " + enemies[currentEnemy].enemyName + " hits you for " + enemies[currentEnemy].enemyAttack + " damage</p>";
        info.insertAdjacentHTML("beforeend", output);
        if (player.health <= 0) {
            //insert game over here
        }
        else {
            output = "<p>" + enemies[currentEnemy].enemyName + " has " + enemies[currentEnemy].enemyHealth + " HP </p>";
            info.insertAdjacentHTML("beforeend", output);
        }
    }
    printStatus();
}

function take() {
    let text = document.getElementById("textField").value;
    for (i = 0; i < items.length; i++) {
        if (text.search(items[i].itemName) != -1 && items[i].itemArea === areas[currentArea].areaName) {
            items[i].itemInventory = 1;

            output = "<p>You take the " + items[i].itemName + " and add it to your inventory</p>";
            info.insertAdjacentHTML("beforeend", output);
        }
        else { }
    }
}

function equip() {
    let text = document.getElementById("textField").value;
    for (i = 0; i < items.length; i++) {
        if (text.search(items[i].itemName) != -1 && items[i].itemInventory === 1) {
            if (items[i].itemEquipped === 0 && items.itemType != "unequippable") {
                if (items[i].itemType === "weapon") {
                    if (player.weaponEquipped !== "none") {
                        for (o = 0; o < items.length; o++) {
                            if (items[o].itemType === "weapon" && items[o].itemEquipped === 1) {
                                items[o].itemEquipped === 0;
                                player.attackLow = player.attackLow - items[o].itemValue;
                                player.attackHigh = player.attackHigh - items[o].itemValue;
                                items[i].itemEquipped = 1;
                                player.attackLow = player.attackLow + items[i].itemValue;
                                player.attackHigh = player.attackHigh + items[i].itemValue;
                                break;
                            }
                            else { }
                        }
                    }
                    else {
                        player.weaponEquipped = items[i].itemName;
                        items[i].itemEquipped = 1;
                        player.attackLow = player.attackLow + items[i].itemValue;
                        player.attackHigh = player.attackHigh + items[i].itemValue;
                        break;
                    }
                }
                else if (items[i].itemType === "armor") {
                    if (player.armorEquipped !== "none") {
                        for (o = 0; o < items.length; o++) {
                            if (items[o].itemType === "armor" && items[o].itemEquipped === 1) {
                                items[o].itemEquipped = 0;
                                player.defense = player.defense - items[o].itemValue;
                                items[i].itemEquipped = 1;
                                player.defense = player.defense + items[i].itemValue;
                                break;
                            }
                            else { }
                        }
                    }
                    else {
                        player.armorEquipped = items[i].itemName;
                        items[i].itemEquipped = 1;
                        player.defense = player.defense + items[i].itemValue;
                        break;
                    }
                }

            }
            else if (items[i].itemEquipped === 1) {
                output = "<p>" + items[i].itemName + " is already equipped.</p>";
                info.insertAdjacentHTML("beforeend", output);
                break;
            }
            else {
                output = "<p>" + items[i].itemName + " can not be equipped.</p>";
                info.insertAdjacentHTML("beforeend", output);
                break;
            }
        }
    }
    printStatus();
}

function printStatus() {
    let playerStatus = document.getElementById("playerStatus");
    while (playerStatus.hasChildNodes()) {
        playerStatus.removeChild(playerStatus.firstChild);
    }
    output = "<p>Health: " + player.health + "/" + player.maxHealth + "</p>" +
             "<p>Attack: " + player.attackLow + " - " + player.attackHigh + "</p>" +
             "<p>Defence: " + player.defense + "</p>" +
             "<p>Weapon: " + player.weaponEquipped + "</p>" +
             "<p>Armor: " + player.armorEquipped + "</p>";

    playerStatus.insertAdjacentHTML("beforeend", output);

}

function printObjective() {
    let objectives = document.getElementById("objectives");
    while (objectives.hasChildNodes()) {
        objectives.removeChild(objectives.firstChild);
    }
    for (currentObjective = 0; currentObjective < quests.length; currentObjective++) {
        if (quests[currentObjective].questStatus === 1) {
            output = '<div class="objective">' + '<h3 class="objectiveTitle">' + quests[currentObjective].questName + "<h3>"
                   + '<p class="objectiveText">' + quests[currentObjective].questDescription + "</p>"
                   + '<p class="objectiveText">' + quests[currentObjective].questObjective + "</p>"
                   + '<p class="objectiveText">Reward: ' + quests[currentObjective].questReward + "</p>" + "</div>";

            objectives.insertAdjacentHTML("beforeend", output);
        }
        else { }
    }
}

document.getElementById("actionButton").addEventListener("click", () => {
    let text = document.getElementById("textField").value;
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
    else if (inTalk === "true") {
        switch (true) {
            case (text === "1" || text === "2" || text === "3" || text === "4" || text === "5" || text === "6" || text === "7" || text === "8" || text === "9"):
            respond();
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
            case (text.startsWith("talk") || text.startsWith("Talk")):
                talk();
                break;
        }
    }
})

