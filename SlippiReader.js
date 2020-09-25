'use strict';
const { SlippiGame, moves } = require('slp-parser-js');
const fs = require("fs");

// games directory to loop over
const gamesDir = "C:/Users/User/Documents/Slippi/";

const files = fs.readdirSync(gamesDir);

// convert files to slippi game objects
const games = files.map((e) => new SlippiGame(gamesDir + e));

var output = "";

var counter = 1
// console.log(JSON.stringify(games[0].getStats().combos.filter(combo => combo.didKill)));
// console.log(Object.getOwnPropertyNames(games[0].getMetadata()));
// console.log(games[0].getMetadata().lastFrame);
games.forEach(game => {
    console.log("Game: " + counter++);
    const combos_that_killed = game.getStats().combos.filter(combo => combo.didKill);
    combos_that_killed.forEach(combo => {
        if (combo.playerIndex == 1) {
            console.log("-You:");
        } else {
            console.log("-Opponent:");
        }
        combo.moves.forEach(move => {
            console.log("--" + moves.getMoveName(move.moveId));
        });
        console.log();
    });
    console.log();
});