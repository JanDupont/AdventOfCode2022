const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf8");

let lines = data.split("\r\n");
let totalScore = 0;
for (let line of lines) {
	let opponent = line[0];
	let me = line[2];
	switch (opponent) {
		case "A": //rock
			me === "X" ? (totalScore += 4) : me === "Y" ? (totalScore += 8) : (totalScore += 3);
			break;
		case "B": //paper
			me === "X" ? (totalScore += 1) : me === "Y" ? (totalScore += 5) : (totalScore += 9);
			break;
		case "C": //scissors
			me === "X" ? (totalScore += 7) : me === "Y" ? (totalScore += 2) : (totalScore += 6);
			break;
	}
}
console.log(totalScore); // 13526
