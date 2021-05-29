// order of queue

setTimeout(() => console.log("Timeout 1"), 0);

Promise.resolve().then(() => console.log("in promise 2"));

setTimeout(() => console.log("Timeout B 1"), 0);

Promise.resolve().then(() => console.log("in promise B 2"));

console.log("outside 3");

// promise -> microTask queue
// setTimeout -> timers (of task queue)

// microTask always comes before timers