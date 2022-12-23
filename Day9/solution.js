const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
let lines = data.split("\r\n");

part1();

// PART 1
function part1() {
	let head = { x: 0, y: 0 };
	let tail = { x: 0, y: 0 };
	let visitedCells = {};
	for (let line of lines) {
		let direction = getDirection(line);
		let steps = getSteps(line);
		doMoves(direction, steps, head, tail, visitedCells);
	}
	console.log(Object.keys(visitedCells).length); // 5513
}

function getDirection(line) {
	return line.split(" ")[0];
}
function getSteps(line) {
	return Number(line.split(" ")[1]);
}
function doMoves(direction, steps, head, tail, visitedCells) {
	for (let i = 0; i < steps; i++) {
		if (direction === "U") {
			head.y++;
			// if not touching
			if (head.y > tail.y + 1) {
				tail.y++;
				if (head.x < tail.x) tail.x--;
				if (head.x > tail.x) tail.x++;
			}
		} else if (direction === "R") {
			head.x++;
			// if not touching
			if (head.x > tail.x + 1) {
				tail.x++;
				if (head.y > tail.y) tail.y++;
				if (head.y < tail.y) tail.y--;
			}
		} else if (direction === "D") {
			head.y--;
			// if not touching
			if (head.y < tail.y - 1) {
				tail.y--;
				if (head.x < tail.x) tail.x--;
				if (head.x > tail.x) tail.x++;
			}
		} else if (direction === "L") {
			head.x--;
			// if not touching
			if (head.x < tail.x - 1) {
				tail.x--;
				if (head.y > tail.y) tail.y++;
				if (head.y < tail.y) tail.y--;
			}
		}
		visitedCells[tail.x + "-" + tail.y] = true;
	}
}
