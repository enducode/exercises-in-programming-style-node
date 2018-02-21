const fs = require('fs');

let wordFregs = [];
let stopWords = [];

const stopWordsData = fs.readFileSync('./stop_words.txt', 'utf8');
stopWords = stopWordsData.split(',');

let bookData = fs.readFileSync(process.argv[2] ? process.argv[2] : './pride-and-prejudice.txt', 'utf8');

let startWordIndex = undefined;
for (let i = 0,len = bookData.length; i < len; i += 1) {
    let s = bookData[i];
    if (startWordIndex === undefined) {
        if (/[0-9a-zA-Z]/g.test(s)) {
            startWordIndex = i;
        }
    } else {
        if (!/[0-9a-zA-Z]/g.test(s)) {
            word = bookData.slice(startWordIndex, i);
            word = word.toLowerCase();
            startWordIndex = undefined;
            if (stopWords.indexOf(word) === -1 && word.length > 1) {
                let found = false;
                let pairIndex = 0;
                for (let j = 0, fLen = wordFregs.length;j < fLen; j += 1) {
                    if (word === wordFregs[j][0]) {
                        found = true;
                        wordFregs[j][1] += 1;
                        break;
                    }
                }
                if (found === false) {
                    wordFregs.push([word, 1]);
                }
            }
        }
    }
}

wordFregs.sort(function(a, b) {
    return b[1] - a[1];
});

for (let i = 0, len = 20; i < len; i += 1) {
    console.log(wordFregs[i][0], '——', wordFregs[i][1]);
};
