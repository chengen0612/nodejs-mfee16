// url for testing
// https://www.twse.com.tw/exchangeReport/STOCK_DAY?
// response=json&
// date=20210501&
// stockNo=2603


// use packages
const axios = require('axios');
const fs = require("fs");
const dayjs = require('dayjs');


// get local date
const today = dayjs().format('YYYYMMDD');


// read file
function fsPromise() {
    return new Promise((resolve, reject) => { 
        fs.readFile("stock.txt", "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};   


// read file and search
fsPromise()
    .then((stockCode) => {
        return axios({
            method: 'get',
            url: 'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
            params: {
                response: JSON,
                date: today,
                stockNo: stockCode
            }
        })
    })
    .then((result) => {
        if (result.status === 200 ) {
            console.log(result.data.date);
            console.log(result.data.title);
        };
    })
    .catch((err) => {
        console.log(err);
    });