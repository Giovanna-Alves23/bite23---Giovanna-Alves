var restauranteModel = require("../models/restauranteModel");

function autenticar(req, res) {
    var nome = req.body.nomeServer;
    var localizacao = req.body.localizacaoServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (localizacao == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        restauranteModel.autenticar(nome, localizacao)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json(resultadoAutenticar);

                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Nome e/ou localização inválido(s)");
                    } else {
                        res.status(403).send("Esse restaurante já foi cadastrado!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro_restaurante.html
    var nome = req.body.nomeServer;
    var descricao = req.body.descricaoServer;
    var horario = req.body.horarioServer;
    var localizacao = req.body.localizacaoServer;
    var categoria = req.body.categoriaServer;
    var vibe = req.body.vibeServer;
    var preferencia = req.body.preferenciaServer;

    console.log(req.body);

    console.log(nome, descricao, horario, localizacao, categoria, vibe, preferencia);

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("O nome do restaurante está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("A descrição do restaurante está undefined!");
    } else if (horario == undefined) {
        res.status(400).send("O horário do restaurante está undefined!");
    } else if (localizacao == undefined) {
        res.status(400).send("A localização do restaurante está undefined!");
    } else if (categoria == undefined) {
        res.status(400).send("A categoria do restaurante está undefined!");
    } else if (vibe == undefined) {
        res.status(400).send("A vibe do restaurante está undefined!");
    } else if (preferencia == undefined) {
        res.status(400).send("A preferencia do restaurante está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo restauranteModel.js
        restauranteModel.cadastrar(nome, descricao, horario, localizacao, categoria, vibe, preferencia)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function anotar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro_restaurante.html
    var fkUsuario = req.body.fkUsuarioServer;
    var fkRestaurante = req.body.fkRestauranteServer;
    var anotacao = req.body.anotacaoServer;
    var star = req.body.starServer;

    console.log(req.body);

    // Faça as validações dos valores
    if (anotacao == undefined) {
        res.status(400).send("A anotação do restaurante está undefined!");
    } else if (star == undefined) {
        res.status(400).send("A classificação do restaurante está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo restauranteModel.js
        restauranteModel.anotar(fkUsuario, fkRestaurante, anotacao, star)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscar(req, res) {
    var categoria = req.body.categoriaServer;
    var vibe = req.body.vibeServer;
    var preferencia = req.body.preferenciaServer;

    restauranteModel.buscar(categoria, vibe, preferencia)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar restaurante! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function mostrarRestaurantes(req,res) {
    restauranteModel.mostrarRestaurantes()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao mostrar resultado! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarPorId(req, res) {
    var fkRestaurante = req.body.fkRestauranteServer;
    var fkUsuario = req.body.fkUsuarioServer;

    restauranteModel.buscarPorId(fkRestaurante, fkUsuario)
        .then(
            function (resultado) {
                res.json(resultado[0]);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar restaurante! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function salvarResposta(req, res) {
    var fkUsuario = req.body.fkUsuarioServer;
    var aconchegante = req.body.aconcheganteServer;
    var romantica = req.body.romanticaServer;
    var despojada = req.body.despojadaServer;
    var classica = req.body.classicaServer;
    var chique = req.body.chiqueServer;

    restauranteModel.salvarResposta(fkUsuario, aconchegante, romantica, despojada, classica, chique)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao salvar a pontuação! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function buscarResultado(req, res) {
    var fkUsuario = req.body.fkUsuarioServer;

    restauranteModel.buscarResultado(fkUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao mostrar resultado! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function favoritos(req, res) {

    restauranteModel.favoritos()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao mostrar resultado! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function naoVisitado(req, res) {
    var categoria = req.body.categoriaServer;
    var vibe = req.body.vibeServer;
    var preferencia = req.body.preferenciaServer;
    var fkUsuario = req.body.fkUsuarioServer;

    restauranteModel.naoVisitado(categoria, vibe, preferencia, fkUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar restaurante não visitado! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function mostrarNaoVisitado(req, res) {
    var fkUsuario = req.body.fkUsuarioServer;

    restauranteModel.mostrarNaoVisitado(fkUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao buscar todos os restaurantes não visitados! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function verAnotacao(req, res) {
    var fkRestaurante = req.body.fkRestauranteServer;

    restauranteModel.verAnotacao(fkRestaurante)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao mostrar resultado! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    autenticar,
    cadastrar,
    anotar,
    buscar,
    mostrarRestaurantes,
    buscarPorId,
    salvarResposta,
    buscarResultado,
    favoritos,
    naoVisitado,
    mostrarNaoVisitado,
    verAnotacao
}