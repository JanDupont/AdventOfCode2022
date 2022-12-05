const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf8");

let lines = data.split("\r\n");
let totalScore = 0;
for (let line of lines) {
	let opponent = line[0];
	let me = line[2];
	switch (opponent) {
		case "A": //rock
			me === "X" ? (totalScore += 3) : me === "Y" ? (totalScore += 4) : (totalScore += 8);
			break;
		case "B": //paper
			me === "X" ? (totalScore += 1) : me === "Y" ? (totalScore += 5) : (totalScore += 9);
			break;
		case "C": //scissors
			me === "X" ? (totalScore += 2) : me === "Y" ? (totalScore += 6) : (totalScore += 7);
			break;
	}
}
console.log(totalScore); // 14204

// A=Rock=1   B=Paper=2     C=Scissors=3
// X=Loose=0  Y=Draw=3      Z=Win=6
