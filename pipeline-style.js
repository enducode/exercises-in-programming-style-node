const fs = require('fs');

function readFileData(filePath) {
    let data = fs.readFileSync(filePath, 'utf8');
    return Promise.resolve(data);
}

function filterChars(data) {
    data = data.replace(/\s+/g, ' ').replace(/[^0-9a-zA-Z]/g, ' ');
    return Promise.resolve(data);
}

function scanAndNormalize(data) {
    words = data.split(/\s+/g);
    for (let i = 0,len = words.length; i < len; i += 1) {
        words[i] = words[i].toLowerCase();
    }
    return Promise.resolve(words);
}

function removeStopWords(words) {
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
    return Promise.resolve(words);
}

function frequencies() {
    let wordFreqs = {};
    for (let i = 0,len = words.length; i < len; i += 1) {
        if (wordFreqs[words[i]] !== undefined) {
            wordFreqs[words[i]] += 1;
        } else {
            wordFreqs[words[i]] = 0;
        }
    }
    return Promise.resolve(wordFreqs);
}

function sort(wordFreqs) {
    let wordFreqsKey = [];
    wordFreqsKey = Object.keys(wordFreqs).sort((a, b) => {
        return wordFreqs[a] - wordFreqs[b];
    });
    return Promise.resolve(wordFreqsKey);
}

function outputFront25(wordFreqs, wordFreqsKey) {
    let len = wordFreqsKey.length;
    for (let i = 0; i < 25; i += 1) {
        console.log(wordFreqsKey[len - i -1], '--', wordFreqs[wordFreqsKey[len - i -1]]);
    }
}

readFileData('./pride-and-prejudice.txt')
.then((data) => {
    filterChars(data).then((data) => {
        scanAndNormalize(data)
        .then((words) => {
            removeStopWords(words)
            .then((words) => {
                frequencies(words)
                .then((wordFreqs) => {
                    sort(wordFreqs)
                    .then((wordFreqsKey) => {
                        outputFront25(wordFreqs, wordFreqsKey);
                    });
                });
            });
        });
    });
});
