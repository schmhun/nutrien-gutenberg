const { bookParse } = require('./parser');

export const handler = async(event: any) => {
    let url = "http://www.gutenberg.org/files/2701/2701-0.txt";

    if (event['url']) {
        url = event['url'];
    }  
    
    let response: string = '';
    let topFifty = await bookParse(url);
    
    response = response + `Top 50 words from ${url}:\n`;
    
    for (let i = 0; i < 50; i++) {
        if (topFifty[i]) {            
            response = response + `${i+1}) ${topFifty[i].word}: ${topFifty[i].count}\n`;            
        }
    }
    
    return response;
}