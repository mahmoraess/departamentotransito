const router = require("express").Router();

const VeiculoController = require("../controllers/veiculoController");

router.post("/cadastro", VeiculoController.cadastrar);

router.get("/buscar/:idVeiculo?", VeiculoController.buscarTodos);

module.exports = router;
