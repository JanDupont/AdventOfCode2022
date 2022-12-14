const fs = require("fs");
const data = fs.readFileSync("./input.txt", "utf8");
let lines = data.split("\r\n");

let filesTree = { "/": { directories: {}, files: {}, size: 0 } };
let currentPosition = filesTree["/"];
let directoryHistory = [];
let resultSum = 0;

// PART 1
buildFileTree();
directoryHistory = ["/"];
currentPosition = getPos(directoryHistory);
setDirectorySizes(currentPosition);
console.log(resultSum); // 1449447
//console.log(JSON.stringify(filesTree, null, 2));

// PART 2
let spaceToClear = 30000000 - (70000000 - filesTree["/"].size);
let root = getPos(["/"]);
let smallestDirToClear = root;
getSmallestDirToClear(root);
console.log(smallestDirToClear.size); // 8679207

function buildFileTree() {
	let command = "";
	for (let line of lines) {
		command = getCommand(line);
		// if line is command
		if (command === "cd") {
			let cdTarget = line.split(" ")[2];
			// cd /
			if (cdTarget === "/") directoryHistory = ["/"];
			// cd ..
			else if (cdTarget === "..") directoryHistory.pop();
			// cd directory
			else {
				if (!currentPosition.directories[cdTarget])
					currentPosition.directories[cdTarget] = { directories: {}, files: {}, size: 0 };
				directoryHistory.push(cdTarget);
			}
			currentPosition = getPos(directoryHistory);
		}
		if (command === "ls") {
			continue;
		}
		// if line is no command
		else if (!command) {
			// if dir
			if (line.split(" ")[0] === "dir") {
				let newDir = line.split(" ")[1];
				currentPosition.directories[newDir] = { directories: {}, files: {}, size: 0 };
			}
			// if file
			else {
				let newFile = line.split(" ")[1];
				let size = Number(line.split(" ")[0]);
				currentPosition.files[newFile] = { size: size };
			}
		}
	}
}
function getCommand(line) {
	if (!line.includes("$")) return null;
	return line.substring(2, 4);
}
function getPos(history) {
	newPos = filesTree;
	for (let dir of history) {
		if (dir === "/") newPos = newPos[dir];
		else newPos = newPos.directories[dir];
	}
	return newPos;
}

function setDirectorySizes(position) {
	for (let dir of Object.keys(position.directories)) {
		let pos = position.directories[dir];
		let size = setDirectorySizes(pos);
		position.size += size;
	}
	// add file sizes
	for (let file of Object.keys(position.files)) {
		position.size += position.files[file].size;
	}
	if (position.size <= 100000) resultSum += position.size;
	return position.size;
}

function getSmallestDirToClear(position) {
	for (let dir of Object.keys(position.directories)) {
		let pos = position.directories[dir];
		getSmallestDirToClear(pos);
	}
	if (position.size > spaceToClear && position.size < smallestDirToClear.size) smallestDirToClear = position;
}
