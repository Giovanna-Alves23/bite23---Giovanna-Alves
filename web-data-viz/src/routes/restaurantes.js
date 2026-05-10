var express = require("express");
var router = express.Router();

var restauranteController = require("../controllers/restauranteController");

//Recebendo os dados do html e direcionando para a função cadastrar de restauranteController.js
router.post("/cadastrar", function (req, res) {
    restauranteController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    restauranteController.autenticar(req, res);
});

router.post("/anotar", function (req, res) {
    restauranteController.anotar(req, res);
});

router.post("/buscar", function (req, res) {
    restauranteController.buscar(req, res);
});

router.get("/buscarPorId/:id", function (req, res) {
    restauranteController.buscarPorId(req, res);
});

module.exports = router;