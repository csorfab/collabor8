var delay = require('await-delay')
 
var a = async () => {
  // Do something 
  
console.log('b')
  // Wait for 2 seconds
  var delay1 = delay(1000), delay2 = delay(1500)
  
  await delay1
 
console.log('a')

await delay2

console.log('c')
  // Do things after the delay 
}

a()
