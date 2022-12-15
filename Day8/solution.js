const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
let lines = data.split("\r\n");

part1(); // 1715
part2(); // 374400

// PART 1
function part1() {
	let visibleTreesCount = 0;
	for (let line = 0; line < lines.length; line++) {
		for (let tree = 0; tree < lines[line].length; tree++) {
			if (line === 0) visibleTreesCount++;
			else if (line === lines.length - 1) visibleTreesCount++;
			else if (tree === 0) visibleTreesCount++;
			else if (tree === lines[line].length - 1) visibleTreesCount++;
			else if (isVisibleFromLeft(line, tree)) {
				visibleTreesCount++;
			} else if (isVisibleFromRight(line, tree)) {
				visibleTreesCount++;
			} else if (isVisibleFromTop(line, tree)) {
				visibleTreesCount++;
			} else if (isVisibleFromBottom(line, tree)) {
				visibleTreesCount++;
			}
		}
	}
	console.log(visibleTreesCount);
}
function isVisibleFromLeft(lineIndex, treeIndex) {
	let treeHeight = lines[lineIndex][treeIndex];
	let foundIndex = lines[lineIndex].split("").findIndex((el) => el >= treeHeight);
	return foundIndex >= treeIndex || foundIndex === -1;
}
function isVisibleFromRight(lineIndex, treeIndex) {
	let treeHeight = lines[lineIndex][treeIndex];
	let foundIndex =
		lines[lineIndex].length -
		lines[lineIndex]
			.split("")
			.reverse()
			.findIndex((el) => Number(el) >= Number(treeHeight)) -
		1;
	return foundIndex <= treeIndex || foundIndex === -1;
}
function isVisibleFromTop(lineIndex, treeIndex) {
	let treeHeight = lines[lineIndex][treeIndex];
	let foundLine = -1;
	for (let i in lines) {
		if (Number(lines[i][treeIndex]) >= Number(treeHeight)) {
			foundLine = i;
			break;
		}
	}
	return foundLine >= lineIndex;
}
function isVisibleFromBottom(lineIndex, treeIndex) {
	let treeHeight = lines[lineIndex][treeIndex];
	let column = [];
	for (let line of lines) {
		column.push(line[treeIndex]);
	}
	let foundIndex = column.length - 1 - column.reverse().findIndex((el) => Number(el) >= Number(treeHeight)) - 1;
	return foundIndex < lineIndex || foundIndex === -1;
}

// PART 2
function part2() {
	let highestScenicScore = 0;
	for (let line = 0; line < lines.length; line++) {
		for (let tree = 0; tree < lines[line].length; tree++) {
			let scenicScore = getScenicScore(line, tree);
			if (scenicScore > highestScenicScore) highestScenicScore = scenicScore;
		}
	}
	console.log(highestScenicScore);
}
function getScenicScore(line, tree) {
	let treeHeight = lines[line][tree];

	let treesAbove = 0;
	let treesRight = 0;
	let treesBelow = 0;
	let treesLeft = 0;

	// above
	for (let i = line - 1; i >= 0; i--) {
		treesAbove++;
		if (lines[i][tree] >= treeHeight) break;
	}
	// right
	for (let i = tree + 1; i < lines[line].length; i++) {
		treesRight++;
		if (lines[line][i] >= treeHeight) break;
	}
	// below
	for (let i = line + 1; i < lines.length; i++) {
		treesBelow++;
		if (lines[i][tree] >= treeHeight) break;
	}
	// left
	for (let i = tree - 1; i >= 0; i--) {
		treesLeft++;
		if (lines[line][i] >= treeHeight) break;
	}
	let scenicScore = treesAbove * treesRight * treesBelow * treesLeft;
	return scenicScore;
}
