'use strict';
const { SlippiGame, moves } = require('@slippi/slippi-js');
const fs = require("fs");

// games directory to loop over
const gamesDir = "/Applications/Slippi/";

const files = fs.readdirSync(gamesDir);

let counter = 1;
let winsCount = 0;
const playerName = "npc";

files.forEach(file => {
    const game = new SlippiGame(gamesDir+file);
        const metadata = game.getMetadata();

    if (metadata.players["0"].names) {
        counter++;

        const playerOneName = metadata.players["0"].names.netplay
        const playerTwoName = metadata.players["1"].names.netplay

        const getStats = game.getStats()
        const playerOneStocksTaken = getStats.overall[0].killCount;
        const playerTwoStocksTaken = getStats.overall[1].killCount;
        
        if (playerName == playerOneName && playerOneStocksTaken > playerTwoStocksTaken) {
            winsCount++;
        }
        if (playerName == playerTwoName && playerTwoStocksTaken > playerOneStocksTaken) {
            winsCount++;
        }
    }
});


        console.log("wins: " + winsCount);
        console.log("games:" + counter);
        console.log(((winsCount / counter) * 100) + "%");