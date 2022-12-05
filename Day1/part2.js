const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");

let split = data.split("\r\n");
let sums = [];
let temp = 0;
for (let number of split) {
	if (number != "") temp += Number(number);
	else {
		sums.push(temp);
		temp = 0;
	}
}
sums.sort((a, b) => {
	return b - a;
});

let solution = sums[0] + sums[1] + sums[2];
console.log(solution);
