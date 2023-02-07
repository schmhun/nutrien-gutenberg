function parseWord(word) {
    if (word === '')
        return '';
    let commonWords = new Set(["the", "of", "to", 'and', 'a', 'in', 'is', 'it', 'you', 'that', 'he', 'was', 'for', 'on', 'are', 'with', 'as', 'I', 'his', 'they', 'be', 'at', 'one', 'have', 'this', 'from', 'or', 'had', 'by', 'not', 'word', 'but', 'what', 'some', 'we', 'can', 'out', 'other', 'were', 'all', 'there', 'when', 'up', 'use', 'your', 'how', 'said', 'an', 'each', 'she']);
    let lcword = word.toLowerCase();
    if (commonWords.has(lcword))
        return '';
    return lcword;
}
function parseLine(line) {
    let tokens = line.split(/[^A-Za-z0-9]/);
    let validTokens = [];
    tokens.forEach((t) => {
        let word = parseWord(t);
        if (word)
            validTokens.push(word);
    });
    return validTokens;
}
function bookParse(url) {
    fetch(url)
        .then((resp) => {
        return resp.text;
    });
}
export { bookParse, parseLine, parseWord };
//# sourceMappingURL=parser.js.map