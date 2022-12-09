const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf8");
let lines = data.split("\r\n");

let stacks = {};
getInitialStacks();
doMoves();
let result = getResult();
console.log(result); //PRTTGRFPB

function getInitialStacks() {
	for (let i = 0; i < 8; i++) {
		let line = lines[i];
		let column = 1;
		for (let j = 1; j < line.length; j = j + 4) {
			let letter = line[j];
			if (!stacks[column]) stacks[column] = [];
			if (letter != " ") stacks[column].push(letter);
			column++;
		}
	}
}
function doMoves() {
	for (let i = 10; i < lines.length; i++) {
		let amount = lines[i].split(" ")[1];
		let from = lines[i].split(" ")[3];
		let to = lines[i].split(" ")[5];
		// part 2
		let temp = "";
		for (let i = 0; i < Number(amount); i++) {
			temp += stacks[from].shift();
		}
		temp = temp.split("").reverse().join("");
		for (let letter of temp) {
			stacks[to].unshift(letter);
		}
		//
	}
}
function getResult() {
	let result = "";
	for (let stack of Object.keys(stacks)) {
		result += stacks[stack][0];
	}
	return result;
}
