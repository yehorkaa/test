const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const app = express();
const homeRoute = require("./routes/home");
const addRoute = require("./routes/add");
const courseRoute = require("./routes/courses");
//////
//это все нужно для работы хбс
const hbs = exphbs.create({
  defaultLayout: "main", // main это файл где будет лежать наш лэйаут главный и в нем будет все рендериться
  extname: "hbs",
});

app.engine("hbs", hbs.engine); // это строка регистрирует то что у нас в принципе есть такой движок hbs и его название
app.set("view engine", "hbs"); // а это чтобы его использовать в принципе
app.set("views", "views"); // вторым параметром идет название папки где будет конфигурация, его можно менять, первое название статичное
/////////

app.use(express.static("public")); // регистрируем папку паблик, в данном ситуации это чтобы юзать цсс
app.use(express.urlencoded({extended: true}))
app.use("/", homeRoute); // это все префиксы, а в роутах эндпоинты их
app.use("/add", addRoute);
app.use("/courses", courseRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("listening the server on ");
});
