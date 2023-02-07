"use strict";
function main() {
    let url = "http://www.gutenberg.org/files/2701/2701-0.txt";
    fetch(url)
        .then((response) => {
        console.log(response.text);
        return response.text;
    });
}
main();
//# sourceMappingURL=app.js.map