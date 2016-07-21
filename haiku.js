var fs = require('fs');
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
	return fs.readFileSync(file).toString();
}

function formatData(data){
	var lines = data.split("\n");

	return lines.map(function(line){
		 return wordFormat(line.split(" "));

	});

}

//take a wordArray and return a two-element array:
//the word (formatted correctly) followed by the # syllables
function wordFormat(wordArray){
	var syl = 0;
	var word = wordArray.shift();
	//strip final (1)
	word = word.replace(/\(\d\)/, '');
	//inc syl for each phon with a num
	wordArray.forEach(function(phoneme){
		if (/\d/.test(phoneme)) syl++;
	});
	return [word, syl];
}


var wordArrays = formatData(cmudictFile);


function createSylArray(wordArrays){
	var syllablesArray = [];
	wordArrays.forEach(function(wordArray){
		var syl = wordArray[1];
		var word = wordArray[0];
		if (syllablesArray[syl]){
			syllablesArray[syl].push(word);
		}
		else {
			syllablesArray[syl] = [word];
		}
	});
	return syllablesArray;
}

var syllablesArray = createSylArray(wordArrays);



function createHaiku(structure){

	if (Array.isArray(structure[0])){
		return createRigidHaiku(structure);
	}

	var numWords = wordArrays.length;
	structure.forEach(function(sylCount){
		var line = '';
		while (sylCount > 0){
			var randomIndex = Math.floor(numWords*Math.random());
			//console.log(randomIndex);
			var randomWord = wordArrays[randomIndex];
			if (randomWord[1] <= sylCount){
				line += randomWord[0] + ' ';
				sylCount -= randomWord[1];
			}
		}
		console.log(line);
	})
}

//this haiku creator takes a structure of the form [ [5],[2,2],[3,1] ]
//where each array gives the syls of each word in that line.
//it uses the syllablesArray rather than the wordArrays
function createRigidHaiku(structure){
	structure.forEach(function(lineArray){
		var line = '';
		lineArray.forEach(function(sylCount){
			var possibleWords = syllablesArray[sylCount];
			var randomIndex = Math.floor(possibleWords.length*Math.random());
			var randomWord = possibleWords[randomIndex];
			line += randomWord + ' ';
		})
		console.log(line);
	});
}


createHaiku([5,7,5]);





module.exports.createHaiku = createHaiku;

