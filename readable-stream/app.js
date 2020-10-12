const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
  input:fs.createReadStream('shoppingList.txt')
});

let printData = data => {
  console.log(`Item: ${data}`);
}

myInterface.on('line',printData);