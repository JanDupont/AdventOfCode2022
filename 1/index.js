const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf8");
let split = data.split("\r\n");
let biggestCalories = 0;
let temp;
for (let number of split) {
	if (number != "") temp += Number(number);
	else {
		if (temp > biggestCalories) biggestCalories = temp;
		temp = 0;
	}
}
console.log(biggestCalories);
