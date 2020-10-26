'use strict';
const { SlippiGame, moves } = require('@slippi/slippi-js');
const fs = require("fs");

//games directory to loop over
const gamesDir = "C:\\Users\\User\\Documents\\Slippi\\";

const files = fs.readdirSync(gamesDir);

let validGames = 0;
let wins = 0;
const playerName = "Slick Revolver";

const games = files.map(file => new SlippiGame(gamesDir + file));

games.forEach(game => {
    const metadata = game.getMetadata();
    if (metadata) {
        const nameObj = metadata.players["0"].names;

        //if name object exists and isn't empty
        if (nameObj && Object.keys(nameObj).length > 0) {
            validGames++;

            const playerOneName = metadata.players["0"].names.netplay
            const playerTwoName = metadata.players["1"].names.netplay

            const stocksArr = game.getStats().stocks;

            const lastStock = stocksArr.find(stock => stock.endPercent == null)

            if (lastStock) {
                const winnerIndex = lastStock.playerIndex;
                const name = metadata.players[winnerIndex].names;

                if (name && name.netplay == playerName) {
                    wins++;
                }
            }
        console.log("wins: " + wins);
        console.log("games:" + validGames);
        console.log(((wins/validGames)*100).toFixed(2) + "%", {wins, validGames});
        }
    }
});
console.log("wins: " + wins);
console.log("games:" + validGames);
console.log(((wins/validGames)*100).toFixed(2) + "%", {wins, validGames});