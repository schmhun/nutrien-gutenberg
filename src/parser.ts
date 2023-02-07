const axios = require('axios');

function parseWord(word: string) {
    if (word === '') return '';
    // 2.5) have a set of common words to skip inclusion in the final count
    let commonWords = new Set(["the","of","to",'and','a','in','is','it','you','that','he','was','for','on','are','with','as','I','his','they','be','at','one','have','this','from','or','had','by','not','word','but','what','some','we','can','out','other','were','all','there','when','up','use','your','how','said','an','each','she']);

    // send to lowercase
    let lcword = word.toLowerCase()
    // skip if word in setOfCommonWords
    if (commonWords.has(lcword)) return '';
    
    return lcword;
}

function parseLines(line: string) {
    let tokens = line.split(/[^A-Za-z0-9']/);
    let validTokens: string[] = [];
    tokens.forEach((t) => {
        let word = parseWord(t);
        if (word) validTokens.push(word);
    })
    return validTokens;
}

function wordCounter(words: string[]) {
    let wordAndCount: Map<string, number> = new Map<string, number>();
    words.forEach((w) => {
        if (wordAndCount.has(w)) {
            wordAndCount.set(w, (wordAndCount.get(w)!+1));
        } else {
            wordAndCount.set(w, 1);
        }
    });

    return wordAndCount;
}

function sortWords(wordMap: Map<string, number>) {
    let sortedMap = new Map([...wordMap.entries()].sort((a, b) => b[1] - a[1]));
    let sortedArr = Array.from(sortedMap, ([word, count]) => ({ word, count }));
    // console.log(sortedArr);
    return sortedArr;
}

async function bookParse(url: string): Promise<void | { word: string; count: number; }[]> {
    // 1) fetch(URL) to get book text into memory
    const resp = await axios.get(url);

    // 2) split on non-alphanumerics except apostrophes
    let parsedWords: string[] = parseLines(resp.data);

    // 3) set {'word': count, 'word2': count...}
    let wordCount: Map<string, number> = wordCounter(parsedWords);

    // 4) sort array by count, get top 50 in set
    let sortedWords: { word: string; count: number; }[] = sortWords(wordCount);

    return sortedWords;
}
// AWS: change trigger to SQS payload/lambda SNS in a separate handler func

export { bookParse, parseLines, parseWord, wordCounter, sortWords };