//various variables for use later
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
//the player, pretty obvious what everything does
const player = {
    health: 30,
    maxHealth: 30,
    attackLow: 1,
    attackHigh: 3,
    defense: 0,
    weaponEquipped: "none",
    armorEquipped: "none",
    gold: 0,
}
//areas contain current area name and area names of areas in all directions + area description
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
//signs only contain text thats printed if you look at them, there are gaps in the array 
// because the function uses the same number from currentArea to find them
signs[1] = "North: guard checkpoint. East: training field. South: road to Greenwood town.";
signs[6] = "Travel to Greenwood town is being temporarily halted for road repairs, it should open again by the end of the week.";
signs[11] = "Placeholder general store, the place where you can find anything and everything."
//items contain name, a value used for different things depending on item, identifier for
//type of item, description, value that decides if the item is in your inventory, 
// value that decides if item is equipped, and associated area
items[0] = new item("training sword", 3, "weapon", "A blunt sword used by knights for practice, still hurts if it hits.", 0, 0, "storage shed");
items[1] = new item("placeholder inn bedroom key", "You have to talk to the woman behind the counter to book a room", "key", "The key to your room in the placeholder inn", 0, "unequippable", "placeholder inn bedroom");
//currently only one enemy in game, they contain name, area, attack, health, 
// drop if any(not implemented yet), and text to update areatext when defeated
enemies[0] = new enemy("wolf", "guard checkpoint", 3, 10, "none", "wolf pelt", "The checkpoint is abandoned, the wooden gate has been smashed to pieces and there is a dead wolf in the corner next to a half eaten human corpse.");
//quests contain objectives, description and name as well as associated area and status 
//which decides whether the quest is visible or not
quests[0] = new quest("Main quest", "story start", "???", "Go north to the next town and search for clues", 0 , "Find out why your hometown was destroyed");
quests[1] = new quest("Help the innkeeper", "placeholder town innkeeper", "A room at the inn", "Find the general store and talk to the owner", 0, "Help the innkeeper pick up her order");
quests[2] = new quest("Return to the innkeeper", "placeholder general store", "A room at the inn", "Give the innkeeper her order", 0, "Help the innkeeper pick up her order");
//npcs contain name, dialogue associated area and a unique descriptor for use to 
// associate responses to npcs
npcs[0] = new npc("woman", "Hello and welcome to placeholder town inn, is there anything I can help you with?", "1. I need somewhere to rest but i'm broke, could i do any work for you in exchange for a room? hiddenreverse Help the innkeeper 2. I am back with your groceries hidden Return to the innkeeper 3. Have you seen anybody come through here, either to or from Greenwood town? 4. No sorry to bother you.", "placeholder inn lobby", "the innkeeper");
npcs[1] = new npc("man", "What do you want?", "1. I heard you tried to get to Greenwood, what happened? 2. Nothing sorry.", "placeholder inn lobby", "inn patron");
npcs[2] = new npc("old man", "Welcome esteemed customer, can I interest you in any of my wares?", "1. Buy Wooden bow - eight gold. 2. Buy Lantern - six gold. 3. Buy Red ring - nine gold. 4. Buy Red potion - two gold. 5. I am here to pick up the grocery order for placeholder inn. hidden Help the innkeeper 6. Not right now, thanks.", "placeholder general store", "the store owner");
//npc responses to player input during conversations, can update quests, give items and 
// take payment
responses[0] = new response("the innkeeper 1", "I might be able to help you, go to the general store and pick up my groceries. When you get back i'll lend you a room.", "none", "Help the innkeeper", "none", 0);
responses[1] = new response("the innkeeper 2", "Thank you for the help dear. I've prepared a room for you upstairs, here's the key.", "Return to the innkeeper", "none", "placeholder inn bedroom key", 0)
responses[2] = new response("the innkeeper 3", "That man in the corner has been staying at the inn for a couple of days waiting for the road to open, try asking him", "none", "none", "none", 0);
responses[3] = new response("the innkeeper 4", "That's okay, talk to me if you need anything", "none", "none", "none", 0);
responses[4] = new response("inn patron 1", "Those bastards were blocking the road, said I had to wait a week for the road to be repaired. Don't know what the king's personal guards are doing fixing roads but what do I know. When I got back here this weird lady asked me to meet her in the camp west of the city but I didn't want any trouble so I haven't gone yet.", "none", "Main quest", "Talk to the lady in the camp west of placeholder town", 0)
responses[5] = new response("inn patron 2", "Then leave me alone", "none", "none", "none", 0)
responses[6] = new response("the store owner 1", "Thank you for your patronage", "none", "none", "Wooden bow", 8)
responses[7] = new response("the store owner 2", "Thank you for your patronage", "none", "none", "Lantern", 6)
responses[8] = new response("the store owner 3", "Thank you for your patronage", "none", "none", "Red ring", 9)
responses[9] = new response("the store owner 4", "Thank you for your patronage", "none", "none", "Red potion", 2)
responses[10] = new response("the store owner 5", "How nice of you to help that kind young lady, say hello to her for me", "Help the innkeeper", "Return to the innkeeper", "none", 0)
responses[11] = new response("the store owner 6", "Just browsing? Talk to me again if you want to buy anything", "none", "none", "none", 0)

//various object constructors
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
//this starts the game on page load by printing various status text and the intro text
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
//move checks if the area you are going to is blocked or not and then checks if the direction
//you are trying to go has an area associated with it
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
//keyCheck checks if you have a key to a door and lets you through if you do
function keyCheck() {
    for (i = 0; i < items.length; i++) {
        if (areas[currentArea].areaNorth.search(items[i].itemArea) != -1 && items[i].itemType === "key") {
            if (items[i].itemInventory === 1) {
                output = "<p>You use the " + items[i].itemName + " to unlock the door.</p>";
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
//changeArea is here so i didn's have to write the same lines eight times
function changeArea() {
    info.removeChild(document.getElementById("firstImpression"));
    output = '<p id="firstImpression">' + areas[currentArea].areaDescription + "</p>";
    info.insertAdjacentHTML("beforeend", output);
}
//Look function currently only works for signs and items, don't have time to write more inspect text for now
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
//The talk function prints npc dialogue and hides hidden options unless conditions 
//are met also sets inTalk to true restricting certain actions
function talk() {
    let text = document.getElementById("textField").value;
    text = text.substring(5);
    for (i = 0; i < npcs.length; i++) {
        if (text === npcs[i].npcName && areas[currentArea].areaDescription.search(npcs[i].npcName) !== -1 && npcs[i].npcArea === areas[currentArea].areaName) {
            inTalk = "true";
            currentTalk = i;

            output = "<p>You talk to " + npcs[currentTalk].npcDescriptor + "</p>"
                   + "<p>" + npcs[currentTalk].npcTalk + "</p>";
            info.insertAdjacentHTML("beforeend", output);
            let n = 1;
            for (o = 1; npcs[currentTalk].npcResponse.search(o) !== -1; o++) {
                if (npcs[currentTalk].npcResponse.search(o) !== -1 && npcs[currentTalk].npcResponse.search(o + 1) !== -1) {
                    let start = npcs[currentTalk].npcResponse.search(o);
                    let end = npcs[currentTalk].npcResponse.search(o + 1);
                    output = (n) + npcs[currentTalk].npcResponse.substring(start + 1, end);
                    if (output.search("hidden") !== -1 && output.search("reverse") !== -1) {
                        for (q = 0; q < quests.length; q++) {
                            if (output.search(quests[q].questName) !== -1 && quests[q].questStatus === 0) {
                                end = output.search("hidden");
                                output = "<p>" + output.substring(0, end) + "</p>";
                                info.insertAdjacentHTML("beforeend", output);
                                n++;
                            }
                            else {}
                        }
                    }
                    else if (output.search("hidden") !== -1) {
                        for (q = 0; q < quests.length; q++) {
                            if (output.search(quests[q].questName) !== -1 && quests[q].questStatus === 1) {
                                end = output.search("hidden");
                                output = "<p>" + output.substring(0, end) + "</p>";
                                info.insertAdjacentHTML("beforeend", output);
                                n++;
                            }
                            else {}
                        }
                    }
                    else {
                        output = "<p>" + output + "</p>";
                        info.insertAdjacentHTML("beforeend", output);
                        n++;
                    }
                }
                else if (npcs[currentTalk].npcResponse.search(o) !== -1 && npcs[currentTalk].npcResponse.search(o + 1) === -1) {
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
//The respond function is a mess but works for now, should change later
//It currently makes sure you can't choose hidden options and then checks if you need money
function respond() {
    let text = document.getElementById("textField").value;
    let count = 0;
    let textSave = 0;
    for (i = 0; i <= text; i++) {
        if (text.search(i) !== -1) {
            textSave = i;
        }
        else {}
    }
    for (i = 0; i <= text; i++) {
        text = text.toString();
        if (text.search(i) !== -1) {
            text = i;
        }
        else{ }
        if(npcs[currentTalk].npcResponse.search(i) !== -1 && npcs[currentTalk].npcResponse.search(i + 1) !== -1) {
            let start = npcs[currentTalk].npcResponse.search(i);
            let end = npcs[currentTalk].npcResponse.search(i + 1);
            output = npcs[currentTalk].npcResponse.substring(start, end);
            }
            else if(npcs[currentTalk].npcResponse.search(i) !== -1 && npcs[currentTalk].npcResponse.search(i + 1) === -1) {
            let start = npcs[currentTalk].npcResponse.search(i);
            output = npcs[currentTalk].npcResponse.substring(start);
            }
            else {}
            console.log(output);
            console.log(text);
            if (output.search("hidden") !== -1 && output.search("reverse") !== -1) {
                for (q = 0; q < quests.length; q++) {
                    if (output.search(quests[q].questName) !== -1 && quests[q].questStatus !== 0) {
                        count++;
                        text++;
                        console.log(text);
                    }
                    else { }
                }
            }
            else if (output.search("hidden") !== -1) {
                for (q = 0; q < quests.length; q++) {
                    if (output.search(quests[q].questName) !== -1 && quests[q].questStatus !== 1) {
                        count++;
                        text++;
                        console.log(text);
                    }
                    else { }
                }
            }
            else {
            }
        
    }
    text = textSave + count;
    text = text.toString();
    console.log(text);
    for (i = 0; i < responses.length; i++) {
        if (responses[i].responseName.search(npcs[currentTalk].npcDescriptor) !== -1 && responses[i].responseName.search(text) !== -1) {
            if (responses[i].responseCost === 0) {
                checkResponse();
                break;
            }
            else if (responses[i].responseCost !== 0 && responses[i].responseCost <= player.gold) {
                player.gold = player.gold - responses[i].responseCost;
                output = "<p>You pay the " + responses[i].responseCost + " gold</p>";
                info.insertAdjacentHTML("beforeend", output);
                checkResponse();
                break;
            }
            else if (responses[i].responseCost !== 0 && responses[i].responseCost > player.gold) {
                output = "<p>You don't have enough gold</p>";
                info.insertAdjacentHTML("beforeend", output);
                break;
            }
        }
        else { }
    }
}
//checks if any quests are updated by a response and if any items are received, then prints
//response text
function checkResponse() {
    if (responses[i].responseQuestGet === "Main quest") {
        quests[0].questObjective = responses[i].responseItem;
        console.log(quests[0].questObjective);
    }
    else { }
    if (responses[i].responseQuestComplete !== "none" && responses[i].responseQuestGet !== "none" && responses[i].responseQuestGet !== "Main quest") {
        for (o = 0; o < quests.length; o++) {
            if (responses[i].responseQuestComplete === quests[o].questName && quests[o].questStatus === 1) {
                quests[o].questStatus = 2;
            }
            else if (responses[i].responseQuestGet === quests[o].questName && quests[o].questStatus === 0) {
                quests[o].questStatus = 1;
            }
            else { }
        }

    }
    else if (responses[i].responseQuestComplete !== "none" && responses[i].responseQuestGet === "none") {
        for (o = 0; o < quests.length; o++) {
            if (responses[i].responseQuestComplete === quests[o].questName) {
                quests[o].questStatus = 2;
            }
            else { }
        }
    }
    else if (responses[i].responseQuestComplete === "none" && responses[i].responseQuestGet !== "none" && responses[i].responseQuestGet !== "Main quest") {
        for (o = 0; o < quests.length; o++) {
            if (responses[i].responseQuestGet === quests[o].questName) {
                quests[o].questStatus = 1;
            }
            else { }
        }
    }
    else { }
    if (responses[i].responseItem !== "none") {
        for (o = 0; o < items.length; o++) {
            if (responses[i].responseItem === items[o].itemName && items[o].itemInventory === 0) {
                items[o].itemInventory = 1;
                output = "<p>The " + items[o].itemName + " was added to your inventory</p>";
                info.insertAdjacentHTML("beforeend", output);
            }
            else { }
        }
    }
    else { }
    output = "<p>" + responses[i].responseContent + "</p>";
    info.insertAdjacentHTML("beforeend", output);
    printObjective();
    inTalk = "false";
    currentTalk = "none";
}
//starts a fight and sets inFight to true restricting certain actions
function fight() {
    let text = document.getElementById("textField").value;
    for (i = 0; i < enemies.length; i++) {
        if (text.search(enemies[i].enemyName) !== -1 && enemies[i].enemyArea === areas[currentArea].areaName) {
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

//used during a fight, calculates damage and ends the fight if you or the enemy dies,
//game over not yet implemented
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
//picks up an item, checks inventory, currentArea and itemArea to check if item exists
function take() {
    let text = document.getElementById("textField").value;
    for (i = 0; i < items.length; i++) {
        if (text.search(items[i].itemName) !== -1 && items[i].itemArea === areas[currentArea].areaName) {
            items[i].itemInventory = 1;

            output = "<p>You take the " + items[i].itemName + " and add it to your inventory</p>";
            info.insertAdjacentHTML("beforeend", output);
        }
        else { }
    }
}
//equips item from inventory if equippable, changes player values when applicable
function equip() {
    let text = document.getElementById("textField").value;
    for (i = 0; i < items.length; i++) {
        if (text.search(items[i].itemName) !== -1 && items[i].itemInventory === 1) {
            if (items[i].itemEquipped === 0 && items.itemType !== "unequippable") {
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
//prints player status when changes occur
function printStatus() {
    let playerStatus = document.getElementById("playerStatus");
    while (playerStatus.hasChildNodes()) {
        playerStatus.removeChild(playerStatus.firstChild);
    }
    output = "<p>Health: " + player.health + "/" + player.maxHealth + "</p>" +
             "<p>Attack: " + player.attackLow + " - " + player.attackHigh + "</p>" +
             "<p>Defence: " + player.defense + "</p>" +
             "<p>Weapon: " + player.weaponEquipped + "</p>" +
             "<p>Armor: " + player.armorEquipped + "</p>" +
             "<p>Gold: " + player.gold + "</p>";

    playerStatus.insertAdjacentHTML("beforeend", output);

}
//prints quests currently active
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
//Based on player input runs various functions, decides what actions are possible based 
//on inFight and inTalk variables
document.getElementById("actionButton").addEventListener("click", () => {
    let text = document.getElementById("textField").value;
    if (inFight === "true") {
        switch (true) {
            case (text === "a"):
                attack();
                break;
            case (text === "i"):
                //inventory use in battle(not yet implemented)
                break;
            case (text === "r"):
                //used to run away from a fight(not yet implemented)
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
    info.scrollBy(0, 500);
})

