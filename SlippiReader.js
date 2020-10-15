'use strict';
const { SlippiGame, moves } = require('slp-parser-js');
const fs = require("fs");

// games directory to loop over
const gamesDir = "C:/Users/User/Documents/Slippi/";

const files = fs.readdirSync(gamesDir);

// convert files to slippi game objects
const games = files.map((e) => new SlippiGame(gamesDir + e));

let counter = 1;
// console.log(Object.getOwnPropertyNames(games[0].getMetadata()));
var winsCount = 0;
const playerName = "Slick Revolver";
games.forEach(game => {
    if (JSON.stringify(game.getMetadata().players["0"].names) != JSON.stringify({})) {
        counter++;
        var playerOneName = game.getMetadata().players["0"].names.netplay
        var playerTwoName = game.getMetadata().players["1"].names.netplay
        if (playerName == playerOneName && game.getStats().overall[0].killCount > game.getStats().overall[1].killCount) {
            winsCount++;
        } else if (playerName == playerTwoName && game.getStats().overall[0].killCount < game.getStats().overall[1].killCount) {
            winsCount++;
        }
        console.log("wins: " + winsCount);
        console.log("games:" + counter);
        console.log(((winsCount / counter) * 100) + "%");
        console.log();
    }
});

//     console.log("Game: " + counter++);
//     const combos_that_killed = game.getStats().combos.filter(combo => combo.didKill);
//    if (combos_that_killed) {
//         combos_that_killed.every(combo => {
//             if (combo.playerIndex == 1) {
//                 console.log("-You:");
//             } else {
//                 console.log("-Opponent:");
//             }
//             combo.moves.forEach(move => {
//                 console.log("--" + moves.getMoveName(move.moveId));
//             });
//             console.log();
//         });
//     }
//     console.log();