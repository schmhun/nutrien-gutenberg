const parser = require('../src/parser');

it('will parse words from a line of text', () => {
    let parsed = parser.parseLines('Apples, bananas, and oranges are tasty.')
    expect(parsed).not.toBeUndefined();
    expect(parsed).toEqual(['apples', 'bananas', 'oranges', 'tasty']);
});

it('will parse words from lines of text', () => {
    let parsed = parser.parseLines('Apples, bananas, and oranges are tasty.\nAs are kiwi.\nMy favorite is apples.')
    expect(parsed).not.toBeUndefined();
    expect(parsed).toEqual(['apples', 'bananas', 'oranges', 'tasty', 'kiwi', 'my', 'favorite', 'apples']);
});

it('will parse a given word that isn\'t common', () => {
    let parsed = parser.parseWord('apple');
    expect(parsed).toEqual('apple');
});

it('will not parse a given word that is common', () => {
    let parsed = parser.parseWord('and');
    expect(parsed).toEqual('');
});

it('will count the occurrence of a word in an array', () => {
    let wordArr = ['hey', 'hey', 'you', 'you', 'i', 'don\'t', 'like', 'your', 'girlfriend'];
    let counted = parser.wordCounter(wordArr);
    let newMap = new Map();
    newMap.set('hey', 2);
    newMap.set('you', 2);
    newMap.set('i', 1);
    newMap.set('don\'t', 1);
    newMap.set('like', 1);
    newMap.set('your', 1)
    newMap.set('girlfriend', 1);
   
    expect(counted).toEqual(expect.any(Map));
    expect(counted.get("don't")).toEqual(1);
});

it('will sort the occurrences by descending order', () => {
    let newMap = new Map();
    newMap.set('hello', 2);
    newMap.set('there', 3);
    newMap.set('friend', 4);
    let sorted = parser.sortWords(newMap);

    expect(sorted).toEqual(expect.any(Array));
    expect(sorted[0].word).toEqual('friend');
    expect(sorted[1].word).toEqual('there');
    expect(sorted[2].word).toEqual('hello');
});

it('will do all of the above things at one go', async () => {
    let url = "http://www.gutenberg.org/files/2701/2701-0.txt";
    let sorted = await parser.bookParse(url);

    expect(sorted).toEqual(expect.any(Array));
});