const express = require("express");
const app = express();

//capturar campos enviados por POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs.engine());
app.set ("view engine", "handlebars")

app.get("/", (req, res) => {
    res.render("home");
    //res.send("Hello World!");
});

const veiculoRoutes = require("./routes/veiculoRoutes");
app.use("/veiculos", veiculoRoutes);

app.listen(8000, (err) => {
    console.log("Aplicação rodando em localhost:8000");
});