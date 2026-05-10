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
                            res.status(403).send("Email e/ou senha inválido(s)");
                        } else {
                            res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                        }
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
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
        var visita = req.body.visitaServer;

        console.log(req.body);

        // Faça as validações dos valores
        if (anotacao == undefined) {
            res.status(400).send("A anotação do restaurante está undefined!");
        } else if (star == undefined) {
            res.status(400).send("A classificação do restaurante está undefined!");
        } else {

            // Passe os valores como parâmetro e vá para o arquivo restauranteModel.js
            restauranteModel.anotar(fkUsuario, fkRestaurante, anotacao, star, visita)
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
        var fkUsuario = req.body.fkUsuarioServer;

        restauranteModel.buscar(categoria, vibe, preferencia,fkUsuario)
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

    function buscarPorId(req, res) {
        const id = req.params.id;

        restauranteModel.buscarPorId(id)
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

    module.exports = {
        autenticar,
        cadastrar,
        anotar,
        buscar,
        buscarPorId
    }