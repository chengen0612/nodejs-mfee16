// built in
const express = require("express");
const router = express.Router();
const path = require("path"); // 路徑管理

// module
const { body, validationResult } = require("express-validator"); // 表單驗證
const bcrypt = require("bcrypt"); // 密碼加密
const multer = require("multer"); // 處理上傳檔案

// API
const connection = require("../utils/db");

// middleware
// 自訂驗證規則
const registerRules = [
  body("email").isEmail().withMessage("email 格式錯誤"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("密碼不可少於六位數")
    .isLength({ max: 10 })
    .withMessage("密碼不可高於十位數"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼不一致"),
];

// 設定上傳檔案的儲存路徑、檔名...
const myStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public", "uploads"));
  },
  filename: function (req, file, cb) {
    // 抓出副檔名
    const ext = file.originalname.split(".").pop();
    // 組合出想要的檔案名稱
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// 做上傳工具
const uploader = multer({
  storage: myStorage,
  fileFilter: function (req, file, cb) {
    // 檢查副檔名
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("這不是圖片"));
    }
    // 通過檢查
    cb(null, true);
  },
  limits: {
    // 限制檔案的上限 1M
    fileSize: 1048576,
  },
});

// router
router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.post(
  "/register",
  uploader.single("photo"),
  registerRules,
  async (req, res, next) => {
    // console.log("表單文字: ", req.body);
    // console.log("表單檔案: ", req.file);
    // console.log('dirname: ', __dirname);

    // express-validator 的驗證結果
    const validateResult = validationResult(req);
    console.log("欄位驗證結果: ", validateResult);

    // 用驗證結果做錯誤處理
    if (!validateResult.isEmpty()) {
      // 回傳的錯誤資料不是空的代表發生錯誤
      return next(new Error("註冊資料不符規定"));
    }

    // 重複註冊
    let exist = await connection.queryAsync(
      "SELECT * FROM members WHERE email = ?",
      req.body.email
    );

    if (exist.length > 0) {
      return next(new Error("已經註冊過了"));
    }

    // 存進資料庫
    let imgPath = req.file ? "uploads/" + req.file.filename : null;
    console.log("輸入圖片路徑到資料庫: ", imgPath);

    await connection.queryAsync(
      "INSERT INTO members (email, password, name, photo) VALUES (?)",
      [
        [
          req.body.email,
          await bcrypt.hash(req.body.password, 10),
          req.body.name,
          imgPath,
        ],
      ]
    );

    res.send("Oh Yeah! Registration accepted!");
    console.log('註冊成功')
  }
);

router.get("/login", (req, res) => {
  res.render("auth/login");
});

// 定登入規則

router.post("/login", async (req, res, next) => {
  // 驗證有沒有這筆資料
  // 找資料庫裡的資料
  // 用內建函式 compare() 比對 前面為加密前 後面是加密後

  let exist = await connection.queryAsync(
    "SELECT * FROM members WHERE email = ?",
    req.body.email
  );

  if (exist.length == 0) next(new Error("無此帳號"));

  res.send("yeahhhhh");
});

module.exports = router;