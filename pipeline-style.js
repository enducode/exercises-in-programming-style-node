const fs = require('fs');

function readFileData(filePath) {
    let data = fs.readFileSync(filePath, 'utf8');
    return data;
}

function filterChars(data) {
    data = data.replace(/\s+/g, ' ').replace(/[^0-9a-zA-Z]/g, ' ');
    return data;
}

function scanAndNormalize(data) {
    words = data.split(/\s+/g);
    for (let i = 0,len = words.length; i < len; i += 1) {
        words[i] = words[i].toLowerCase();
    }
    return words;
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
    return words;
}

function frequencies() {
    let wordFreqs = [];
    for (let i = 0,len = words.length; i < len; i += 1) {
        let word = words[i];
        let keys = wordFreqs.map((v) => {
            if (v[0]) {
                return v[0];
            }
        });
        if (keys.indexOf(word) !== -1) {
            wordFreqs[keys.indexOf(word)][1] += 1;
        } else {
            wordFreqs.push([word, 1]);
        }
    }
    return wordFreqs;
}

function sort(wordFreqs) {
    return wordFreqs.sort((a, b) => {
        return b[1] - a[1];
    });
}

function outputFront25(wordFreqs) {
    let len = wordFreqs.length;
    for (let i = 0; i < 25; i += 1) {
        console.log(wordFreqs[i][0], '--', wordFreqs[i][1]);
    }
}

outputFront25(
    sort(
        frequencies(
            removeStopWords(
                scanAndNormalize(
                    filterChars(
                        readFileData('./pride-and-prejudice.txt')
                    )
                )
            )
        )
    )
)
