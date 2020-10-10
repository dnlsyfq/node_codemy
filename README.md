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



