// Promise.all()
// Promise.race()
// =============================================

let doWork = function (job, timer, cb) {
    setTimeout(() => {
      let dt = new Date();
      cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
    }, timer);
  };
  
// new Promise(function (resolve, reject) {});
let doWorkPromise = function (job, timer, success) {
return new Promise((resolve, reject) => {
    setTimeout(() => {
    let dt = new Date();
    if (success) {
        return resolve(`完成工作: ${job} at ${dt.toISOString()}`);
    }
    reject(`!!工作失敗: ${job} at ${dt.toISOString()}`);
    }, timer);
});
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
let count = 0;
// 寫功課, 聽音樂, 同學聊天
// p1, p2, p3 是一個 Promise <pending>
let p1 = doWorkPromise("寫功課", 3000, true);
let p2 = doWorkPromise("聽音樂", 2500, false);
let p3 = doWorkPromise("同學聊天", 3500, true);

// 1. 並行地做 （非同步）
// 2. 三件事「都」做完的時候通知我 -> console.log
// Promise.all([p1, p2, p3])
// .then((values) => {
//     console.log("race");
//     console.log(values);
// })
// .catch((err) => {
//     console.log("錯誤！", err);
// });

// 1. 並行地做 （非同步）
// 2. 只要有一件事成功或失敗就通知我 -> console.log
Promise.race([p1, p2, p3])
.then((values) => {
    console.log("race");
    console.log(values);
})
.catch((err) => {
    console.log("錯誤！", err);
});