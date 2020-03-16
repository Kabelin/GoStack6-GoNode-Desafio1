const express = require("express");
const app = express();

const nunjucks = require("nunjucks");

const checkAgeMiddleware = (req, res, next) => {
  const { age } = req.query;

  if (!age) {
    return res.redirect("/");
  }

  return next();
};

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true
});
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "njk");

app.get("/", (req, res) => {
  return res.render("age");
});

app.post("/check", (req, res) => {
  if (req.body.age > 18) return res.redirect(`/major/?age=${req.body.age}`);
  else return res.redirect(`/minor/?age=${req.body.age}`);
});

app.get("/major", checkAgeMiddleware, (req, res) => {
  return res.render("major", { age: req.query.age });
});

app.get("/minor", checkAgeMiddleware, (req, res) => {
  return res.render("minor", { age: req.query.age });
});

app.listen(3000);
