# 我的代辦事項清單

![Index page about Restaurant List](./public/image/Image%2010.png)

## 介紹

紀錄屬於自己的代辦事項，可以瀏覽所有代辦事項、查看代辦事項詳細資訊、CRUD

### 功能

- 查看所有代辦事項
- 瀏覽代辦事項的詳細資訊
- 新增代辦事項
- 編輯代辦事項
- 刪除代辦事項
- 註冊帳號、登入、登出
- 第三方登入 Facebook login

## 開始使用

1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

4. 安裝完畢後，繼續輸入：

   ```bash
   npm run start
   ```

5. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Listening on http://localhost:3000
   ```

6. 若欲暫停使用

   ```bash
   ctrl + c
   ```
7. 製作種子資料

   ```bash
   npm run seed
   ```

## 開發工具

  - bcryptjs": "^2.4.3",
  - connect-flash": "^0.1.1",
  - express": "^4.17.1",
  - express-handlebars": "^4.0.4",
  - express-session": "^1.17.1",
  - method-override": "^3.0.0",
  - mysql2": "^2.1.0",
  - passport": "^0.4.1",
  - passport-facebook": "^3.0.0",
  - passport-local": "^1.0.0",
  - sequelize": "^5.21.13",
  - sequelize-cli": "^5.5.1"
  - dotenv": "^16.0.3"