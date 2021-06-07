# Getting Started with URL Shortner App

This application can be used to convert any url into your own password protected short url.

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
