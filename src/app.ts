const { bookParse } = require('./parser');

async function main() {
    let url = "http://www.gutenberg.org/files/2701/2701-0.txt"

    let topFifty = await bookParse(url);

    console.log(`Top 50 words:`);
    for (let i = 0; i < 50; i++) {
        if (topFifty[i]) {
            console.log(`${i+1}) ${topFifty[i].word}: ${topFifty[i].count}\n`);
        }
    }
}

main();