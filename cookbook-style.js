const fs = require('fs');

let data = '';
let wordFreqs = {};
let wordFreqsKey = [];
let words = [];

const isalnum = (w) => /[0-9a-zA-Z]/g.test(w);

function readFileData() {
    data = fs.readFileSync('./pride-and-prejudice.txt', 'utf8');
}

function filterChars() {
    data = data.replace(/\s+/g, ' ');
    data = data.replace(/[^0-9a-zA-Z]/g, ' ');
}

function scanAndNormalize() {
    words = data.split(/\s+/g);
    for (let i = 0,len = words.length; i < len; i += 1) {
        words[i] = words[i].toLowerCase();
    }
}

function removeStopWords() {
    //read stop word file
    let stopWords = fs.readFileSync('./stop_words.txt', 'utf8').split(',');
    let rmIndex = [];
    for (let i = 0,len = words.length; i < len; i += 1) {
        if (stopWords.indexOf(words[i]) !== -1 || words[i].length < 1) {
            rmIndex.push(i);
        }
    }
    rmIndex.forEach((i, index) => {
        i = i - index;
        words.splice(i, 1);
    });
}

function frequencies() {
    for (let i = 0,len = words.length; i < len; i += 1) {
        if (wordFreqs[words[i]] !== undefined) {
            wordFreqs[words[i]] += 1;
        } else {
            wordFreqs[words[i]] = 0;
        }
    }
}


function sort() {
    wordFreqsKey = Object.keys(wordFreqs).sort((a, b) => {
        return wordFreqs[a] - wordFreqs[b];
    });
}

readFileData();
filterChars()
scanAndNormalize();
removeStopWords();
frequencies();
sort();

let len = wordFreqsKey.length;
for (let i = 0; i < 25; i += 1) {
    console.log(wordFreqsKey[len - i -1], '--', wordFreqs[wordFreqsKey[len - i -1]]);
}
