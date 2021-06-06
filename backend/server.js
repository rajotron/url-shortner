const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
const URL = db.urls;

// simple route
app.get("/", (req, res) => {
  res.json({ message: "URL SHORTNER" });
});

app.use(express.static(__dirname + "/public"));
const pageNotFound = path.join(__dirname, "/public/404.html");
const linkExpired = path.join(__dirname, "/public/expired.html");
const authenticationPage = path.join(__dirname, "/public/password.html");

// Redirecting to the originalUrl
app.get("/:id", async (req, res, next) => {
  const { id: postFixTerm } = req.params;
  console.log("Key ---- ", postFixTerm);
  try {
    const url = await URL.findOne({ where: { postFix: postFixTerm } });

    if (url) {
      const { originalUrl, expiryDate, isProtected } = url;
      console.log("Searching url by key -- ", originalUrl);
      if (!isProtected) {
        if (new Date(expiryDate) < new Date()) {
          return res.status(404).sendFile(linkExpired);
        }
        return res
          .status(301)
          .redirect(
            originalUrl.includes("http") ? originalUrl : "//" + originalUrl
          );
      } else {
        return res.status(401).sendFile(authenticationPage);
      }
    }
    return res.status(404).sendFile(pageNotFound);
  } catch (error) {
    return res.status(500).sendFile(pageNotFound);
  }
});

// Redirecting if URL is password protected
app.post("/:id", async (req, res, next) => {
  const { id: postFixTerm } = req.params;
  const { password: inputPassword } = req.body;
  console.log("Key ---- ", postFixTerm);
  try {
    const url = await URL.findOne({ where: { postFix: postFixTerm } });

    if (url) {
      const { originalUrl, expiryDate, password } = url;

      if (new Date(expiryDate) < new Date()) {
        return res.status(404).sendFile(linkExpired);
      }
      console.log("Passwords ----- ", inputPassword, password);
      if (inputPassword === password) {
        return res
          .status(200)
          .send({
            url: originalUrl.includes("http")
              ? originalUrl
              : "//" + originalUrl,
          });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
    return res.status(404).sendFile(pageNotFound);
  } catch (error) {
    return res.status(500).sendFile(pageNotFound);
  }
});

require("./app/routes/urls.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
