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

    const usuarioRoutes = require("./routes/usuarioRoutes.js");
    app.use("/usuarios", usuarioRoutes);

    const UsuarioController = require("./controllers/UsuarioController");

    app.get("/areaLogada", UsuarioController.verificaAutenticacao, (req, res) => {
        res.json({
            msg: 
            "Você está logado com o ID" +
            req.usuarioId +  
            "e pode acessar este recurso.",
        });
    });

    app.get(
        "/areaAdmin",
        UsuarioController.verificaAutenticacao,
        UsuarioController.verificaIsAdmin,
        (req, res) => {
        res.json({
            msg: "Você é um administrador!",
        });

    });

    app.listen(8000, (err) => {
        console.log("Aplicação rodando em localhost:8000");
    });