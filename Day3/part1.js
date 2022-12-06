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
for (let line of lines) {
	let length = line.length;
	let half1 = line.substring(0, length / 2);
	let half2 = line.substring(length / 2);
	let matchingCharacter = "";
	for (let character of half1) {
		if (half2.includes(character)) matchingCharacter = character;
	}
	sum += getPriority(matchingCharacter);
}
console.log(sum); // 8202
