### CLI

> node -v
version

> global


### Editor

multiple lines

> .editor
ctrl + d to evaluate

### process property

> process.env
 object which stores and controls information about the environment in which the process is currently running

```
// add a property to process.env with the key NODE_ENV and a value of either production or development.

if (process.env.NODE_ENV === 'development'){
  console.log('Testing! Testing! Does everything work?');
}
```

> process.memoryUsage()
returns information on the CPU demands of the current process

* heapUsed will return a number representing how many bytes of memory the current process is using.

> process.argv
holds an array of command line values provided when the current process was initiated. 
* The first element in the array is the absolute path to Node, which ran the process. 
* The second element in the array is the path to the file that’s running.
* The following elements will be any command line arguments provided when the process was initiated
```
node myProgram.js testing several features
console.log(process.argv[3]); // Prints 'several'
```

```
let initialMemory = process.memoryUsage().heapUsed;
let word = process.argv[2];

console.log(`Your word is ${word}`)

// Create a new array
let wordArray = [];

// Loop 1000 times, pushing into the array each time 
for (let i = 0; i < 1000; i++){
  wordArray.push(`${word} count: ${i}`)
}

console.log(`Starting memory usage: ${initialMemory}. \nCurrent memory usage: ${process.memoryUsage().heapUsed}. \nAfter using the loop to add elements to the array, the process is using ${process.memoryUsage().heapUsed - initialMemory} more bytes of memory.`)
```
### Modules
The core modules are defined within Node.js’s source and are located in the lib/ folder
```
let events = require('events');
```
> local module
local modules are required by passing in the path to the module
```
let Dog = require('./dog'); 

// or 
let Dog = require('./dog.js');
```

> module.exports
special JavaScript object called module.exports. It holds everything in that file, or module, that’s available to be required into a different file.
```
// dog.js

module.exports = class Dog {
 
 constructor(name){
  this.name = name;
 }
 
 praise(){
  return `Good dog, ${this.name}!`;
 }
}

// app.js

let Dog = require('./dog.js');
const tadpole = new Dog('Tadpole');
console.log(tadpole.praise());
```
### Event Driven

Node provides an EventEmitter class which we can access by requiring in the events core module

```
let events = require('events);
let myEmitter = new events.EventEmitter();

```

> .on() method 
* assigns a listener callback function to a named event. 
* The .on() method takes as its first argument the name of the event as a string and, as its second argument, the listener callback function.

> .emit() method
* announces a named event has occurred.
* .emit() method takes as its first argument the name of the event as a string and, as its second argument, the data that should be passed into the listener callback function

```
let newUserListener = (data) => {
  console.log(`We have a new user: ${data}`);
};

myEmitter.on('new user',newUserListener)

myEmitter.emit('new user','Lily Pad')
```

### Asynchronous Javascript 

The event-loop enables asynchronous actions to be handled in a non-blocking way

```
let keepGoing = true;

let callback = () => {keepGoing = false;};

setTimeout(callback,1000);

while(keepGoing === true){
  console.log('Test');
}
```

### Input / Output

```
process.stdout.write('text')
```

```
process.stdin.on('data', (userInput) => {
  let input = userInput.toString()
  console.log(input)
});
```

### Error 

Many asynchronous Node APIs use error-first callback functions: callback functions which have an error as the first expected argument and the data as the second argument. If the asynchronous task results in an error, it will be passed in as the first argument to the callback function. If no error was thrown, the first argument will be undefined.

```
const errorFirstCallback = (err, data)  => {
  if (err) {
    console.log(`There WAS an error: ${err}`);
  } else {
     // err was falsy
      console.log(`There was NO error. Event data: ${data}`);
  }
}
```

### Filesystem

```
const fs = require('fs');

let readDataCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    console.log(`Provided file contained: ${data}`);
  }
};

fs.readFile('./file.txt', 'utf-8', readDataCallback);
```

### Readable Streams

> .createInterface()
* To read files line-by-line
* returns an EventEmitter set up to emit 'line' events

```
const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
  input: fs.createReadStream('text.txt')
});

myInterface.on('line', (fileLine) => {
  console.log(`The line read: ${fileLine}`);
});

```

### Writeable streams 

```
const fs = require('fs')

const fileStream = fs.createWriteStream('output.txt');

fileStream.write('This is the first line!'); 
fileStream.write('This is the second line!');
fileStream.end();
```

```
const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
  input: fs.createReadStream('shoppingList.txt')
});

const fileStream = fs.createWriteStream('shoppingResults.txt')

let transformData = line => {
  fileStream.write(`They were out of: ${line}\n`);
}

myInterface.on('line',transformData);
```

### HTTP Server 

```
const http = require('http');

let requestListener = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain' });
  response.write('Hello World!\n');
  response.end();
};

const server = http.createServer(requestListener);

server.listen(3000);
```