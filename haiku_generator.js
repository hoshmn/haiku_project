var haiku = require('./haiku');

console.log('call the creator with a [5,7,5] structure:');
haiku.createHaiku([5,7,5]);

console.log('\n\ncall the creator with a crazy, syllable-specified structure:');
haiku.createHaiku([[1],[2],[3],[4],[5],[6],[7],[8],[9],
	[1,2,3,2],[2,3,2],[1,2,1,2],[1,1,1,1,1],[4],[2,1],[1,1],[1]]);
