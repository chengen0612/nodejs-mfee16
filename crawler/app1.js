// url for testing
// https://www.twse.com.tw/exchangeReport/STOCK_DAY?
// response=json&
// date=20210501&
// stockNo=2603


// require package in nodejs
const axios = require('axios');


// basic
// axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210501&stockNo=2603')
//   .then(function (response) {
//     // handle success
//     console.log(response.data.data);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });


// axios API
axios({
    method: 'get',
    url: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
    params: {
        response: JSON,
        date: 20210501,
        stockNo: 2330
    }
})
    .then(function (response) {
        console.log(response.data)
    });