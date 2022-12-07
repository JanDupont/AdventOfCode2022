const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf8");
let lines = data.split("\r\n");

function doesOverlap(start1, end1, start2, end2) {
	// start of list 2 is in list 1  || end of list 2 is in list 1
	return (start1 <= start2 && end1 >= start2) || (start1 <= end2 && end1 >= end2);
}

let count = 0;
for (let line of lines) {
	let half1 = line.split(",")[0];
	let half2 = line.split(",")[1];

	let start1 = Number(half1.split("-")[0]);
	let end1 = Number(half1.split("-")[1]);
	let start2 = Number(half2.split("-")[0]);
	let end2 = Number(half2.split("-")[1]);

	if (doesOverlap(start1, end1, start2, end2)) count++;
	else if (doesOverlap(start2, end2, start1, end1)) count++;
}

console.log(count); // 808
