/*
 * TODO
 */

const fs = require('fs');

let stopWords = [];
let words = [];
let wordFreqs = [];

stopWords = fs.readFileSync('./stop_words.txt', 'utf8').split(',');
fs.readFileSync('./pride-and-prejudice.txt', 'utf8').split(/[^a-zA-Z]+/).map((w) => {
    w = w.toLowerCase();
    if (w && w.length > 1 && stopWords.indexOf(w) === -1) {
        words.push(w);
    }
});
words.map((w, i) => {
    let keys = wordFreqs.map((v) => v[0]);
    if (keys.indexOf(w) !== -1) {
        wordFreqs[keys.indexOf(w)][1] += 1;
    } else {
        wordFreqs.push([w, 1]);
    }
});

wordFreqs.sort((a, b) => {
    return b[1] - a[1];
});

for (let i = 0; i < 25; i += 1) {
    console.log(wordFreqs[i][0], '--', wordFreqs[i][1]);
}
