const router = require("express").Router();

const VeiculoController = require("../controllers/veiculoController");

router.get("/cadastro" , VeiculoController.formCadastro);

router.post("/cadastro", VeiculoController.cadastrar);

router.get("/todos", VeiculoController.buscarTodos);

module.exports = router;