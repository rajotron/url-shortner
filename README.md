# Getting Started with URL Shortner App

This application can be used to convert any url into your own password protected short url.

![image](https://user-images.githubusercontent.com/26489347/121045022-4aafe380-c7d3-11eb-8f5c-6e89dbf28c22.png)

### Features
1. Password Protected - You can set your own password for any url, when you will try to reach that short url it will ask you for password, when verified only then it will redirect to the original URL
![image](https://user-images.githubusercontent.com/26489347/121047626-eb060800-c7d3-11eb-8564-d7c55d3e8dfe.png)


2. Expiry date - You can set the expiy date for any URL. After that date/time user can not access the URL and will be redirected to the page given below.
![image](https://user-images.githubusercontent.com/26489347/121048210-3cae9280-c7d4-11eb-9b58-6fa691185027.png)


3. Page not found - If you are trying to use different key and using the domain of the short url then you will be redirected to the "NOT FOUND" page.
![image](https://user-images.githubusercontent.com/26489347/121048539-88f9d280-c7d4-11eb-9f3d-e4c0cf34db41.png)




## Installation

### For UI

1. Clone the repo
   ```sh
   git clone https://github.com/rajotron/url-shortner.git
   ```
2. Install NPM packages
   ```sh
   yarn install or npm install
   ```
Note: Remember to remove yarn.lock file from root directory before installing it via npm.

3. Run web application on local (Development environment)
    ```sh
   yarn start
   ```
   Runs the app in the development mode.\
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
   
   You can directly use already deployed web app on Heroku at [https://s0url.herokuapp.com](https://s0url.herokuapp.com)

### For Server (Backend)

1. Install NPM packages
   ```sh
   cd backend
   yarn install
   ```
   
2. Change database config in `backend/app/config/db.config.js`
   ```JS

   module.exports = {
     HOST: HOST_NAME,
     USER: USER_NAME,
     PASSWORD: DB_PASSWORD,
     DB: DB_NAME,
     dialect: "postgres",
     pool: {
       max: 5,
       min: 0,
       acquire: 30000,
       idle: 10000
     }
    }
     ```

Default testing db config is already present there in this config file, but will be deleted after a while.
_For more examples, please refer to the 

3. Run web server (express) on local (Development environment)
    ```sh
   yarn start
   ```
