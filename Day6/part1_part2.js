const fs = require("fs");

const data = fs.readFileSync("./input.txt", "utf8");

// part 1
first_sequence_without_duplicates(4); // 1042
// part 2
first_sequence_without_duplicates(14); // 2980

function first_sequence_without_duplicates(size) {
	let buffer = [];
	let result = -1;
	for (let index = 0; index < data.length; index++) {
		let char = data[index];
		buffer.push(char);
		if (buffer.length < size) continue;
		if (hasNoDuplicates(buffer)) {
			result = index + 1;
			console.log(buffer, result);
			return;
		}
		buffer.shift();
	}
}

function hasNoDuplicates(array) {
	return array.length === new Set(array).size;
}
