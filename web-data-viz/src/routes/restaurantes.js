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

router.get("/mostrarRestaurantes", function (req, res) {
    restauranteController.mostrarRestaurantes(req, res);
});

router.get("/buscarPorId/:id/:fkUsuario", function (req, res) {
    restauranteController.buscarPorId(req, res);
});

router.post("/salvarResposta", function (req, res) {
    restauranteController.salvarResposta(req, res);
});

router.get("/buscarResultado/:fkUsuario", function (req, res) {
    restauranteController.buscarResultado(req, res);
});

router.get("/favoritos", function (req, res) {
    restauranteController.favoritos(req, res);
});

router.post("/naoVisitado", function (req, res) {
    restauranteController.naoVisitado(req, res);
});

router.post("/mostrarNaoVisitado", function (req, res) {
    restauranteController.mostrarNaoVisitado(req, res);
});

router.get("/verAnotacao/:id", function (req, res) {
    restauranteController.verAnotacao(req, res);
});

module.exports = router;