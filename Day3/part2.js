const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf8");
let lines = data.split("\r\n");

function isUppercase(char) {
	return char === char.toUpperCase();
}
function getPriority(char) {
	if (isUppercase(char)) return char.charCodeAt(0) - 38;
	else return char.charCodeAt(0) - 96;
}

let sum = 0;
for (let i = 0; i < lines.length; i = i + 3) {
	let charsInOneAndTwo = [];
	for (let character of lines[i]) {
		if (lines[i + 1].includes(character) && !charsInOneAndTwo.includes(character)) charsInOneAndTwo.push(character);
	}
	let matchingCharacter = "";
	for (let character of charsInOneAndTwo) {
		if (lines[i + 2].includes(character)) matchingCharacter = character;
	}
	sum += getPriority(matchingCharacter);
}
console.log(sum); // 2864
