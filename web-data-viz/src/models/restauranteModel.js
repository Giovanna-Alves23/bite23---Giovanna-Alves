const { verAnotacoes, mostrar } = require("../controllers/restauranteController");
var database = require("../database/config")

function autenticar(nome, localizacao) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function autenticar(): ", nome, localizacao)

    var instrucaoSql = `
        SELECT idRestaurante, nomeRestaurante, localizacao FROM restaurante 
        WHERE nome = '${nome}' AND localizacao LIKE  '%${localizacao}%';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, descricao, horario, localizacao, categoria, vibe, preferencia) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, descricao, horario, localizacao, categoria, vibe, preferencia);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO restaurante (nomeRestaurante, descricao, horario, localizacao, categoria, vibe, preferencia) 
        VALUES ('${nome}', '${descricao}', '${horario}', '${localizacao}','${categoria}', '${vibe}', '${preferencia}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function anotar(fkUsuario, fkRestaurante, anotacao, star) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function anotar():", fkUsuario, fkRestaurante, anotacao, star);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuarioRestaurante (fkUsuario, fkRestaurante, anotacao, classificacao) 
        VALUES ('${fkUsuario}', '${fkRestaurante}', '${anotacao}', '${star}')
        ON DUPLICATE KEY UPDATE anotacao = VALUES (anotacao),
        classificacao = VALUES (classificacao);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscar(categoria, vibe, preferencia) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscar():", categoria, vibe, preferencia);

    var instrucaoSql = `
        SELECT idRestaurante, nomeRestaurante, categoria, vibe, 
        (SELECT ROUND(AVG(classificacao)) 
        FROM usuarioRestaurante s WHERE r.idRestaurante = s.fkRestaurante) classificacao FROM restaurante r
        WHERE categoria = '${categoria}' AND vibe = '${vibe}' 
        AND preferencia = '${preferencia}';
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mostrarRestaurantes() {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mostrarRestaurantes():");

    var instrucaoSql = `
        SELECT idRestaurante, nomeRestaurante, categoria, vibe,
        (SELECT ROUND(AVG(classificacao)) 
        FROM usuarioRestaurante s WHERE r.idRestaurante = s.fkRestaurante) classificacao 
        FROM restaurante r LIMIT 15;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id, fkUsuario) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId():", id, fkUsuario);

    var instrucaoSql = `
    SELECT r.nomeRestaurante, r.descricao, r.horario, r.localizacao, s.anotacao, s.classificacao
    FROM restaurante r
    LEFT JOIN usuarioRestaurante s ON s.fkRestaurante = r.idRestaurante AND s.fkUsuario = ${fkUsuario}
    WHERE idRestaurante = ${id}
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function salvarResposta(fkUsuario, aconchegante, romantica, despojada, classica, chique) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId():", fkUsuario, aconchegante, romantica, despojada, classica, chique);

    var instrucaoSql = `
    INSERT INTO quiz (fkUsuario, aconchegante, romantica, despojada, classica, chique) VALUES 
    (${fkUsuario}, ${aconchegante}, ${romantica}, ${despojada}, ${classica}, ${chique})
    ON DUPLICATE KEY UPDATE 
    aconchegante = VALUES (aconchegante),
    romantica = VALUES (romantica),
    despojada = VALUES (despojada),
    classica = VALUES (classica),
    chique = VALUES (chique);
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarResultado(fkUsuario) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscar():", fkUsuario);

    var instrucaoSql = `
        SELECT aconchegante, romantica, despojada, classica, chique FROM quiz
        WHERE fkUsuario = ${fkUsuario};
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function favoritos() {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function favoritos():");

    var instrucaoSql = `
        SELECT nomeRestaurante, ROUND(AVG(classificacao)) media, COUNT(classificacao) total FROM usuarioRestaurante
        JOIN restaurante ON idRestaurante = fkRestaurante
        GROUP BY idRestaurante, nomeRestaurante
        ORDER BY media DESC, total DESC
        LIMIT 5;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function naoVisitado(categoria, vibe, preferencia, fkUsuario) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function naoVisitado():", categoria, vibe, preferencia, fkUsuario);

    var instrucaoSql = `
        SELECT idRestaurante, nomeRestaurante, categoria, vibe,
        (SELECT ROUND(AVG(classificacao)) 
        FROM usuarioRestaurante s WHERE r.idRestaurante = s.fkRestaurante) classificacao FROM restaurante r
        LEFT JOIN usuarioRestaurante s ON fkUsuario = ${fkUsuario} AND r.idRestaurante = s.fkRestaurante
        WHERE categoria = '${categoria}' AND vibe = '${vibe}' 
        AND preferencia = '${preferencia}' AND s.fkUsuario IS NULL;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mostrarNaoVisitado(fkUsuario) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mostrarNaoVisitado():", fkUsuario);

    var instrucaoSql = `
        SELECT idRestaurante, nomeRestaurante, categoria, vibe,
        (SELECT ROUND(AVG(classificacao)) 
        FROM usuarioRestaurante s WHERE r.idRestaurante = s.fkRestaurante) classificacao FROM restaurante r
        LEFT JOIN usuarioRestaurante s ON fkUsuario = ${fkUsuario} AND r.idRestaurante = s.fkRestaurante
        WHERE s.fkUsuario IS NULL;
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verAnotacao(id) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verAnotacoes():", id);

    var instrucaoSql = `
        SELECT nomeUsuario, anotacao, classificacao FROM usuarioRestaurante
        JOIN usuario ON idUsuario = fkUsuario
        WHERE fkRestaurante = ${id};
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
};