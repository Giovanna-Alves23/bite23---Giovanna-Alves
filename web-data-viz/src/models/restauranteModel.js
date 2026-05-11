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
function anotar(fkUsuario, fkRestaurante, anotacao, star, visita) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function anotar():", fkUsuario, fkRestaurante, anotacao, star, visita);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuarioRestaurante (fkUsuario, fkRestaurante, anotacao, classificacao, visita) 
        VALUES ('${fkUsuario}', '${fkRestaurante}', '${anotacao}', '${star}', ${visita})
        ON DUPLICATE KEY UPDATE anotacao = VALUES (anotacao),
        classificacao = VALUES (classificacao),
        visita = VALUES (visita);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscar(categoria, vibe, preferencia, fkUsuario, classificacao) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscar():", categoria, vibe, preferencia, fkUsuario, classificacao);

    var instrucaoSql = `
        SELECT idRestaurante, nomeRestaurante, categoria, vibe, classificacao FROM restaurante
        LEFT JOIN usuarioRestaurante ON idRestaurante = fkRestaurante
        AND fkUsuario = ${fkUsuario}
        WHERE categoria = '${categoria}' AND vibe = '${vibe}' 
        AND preferencia = '${preferencia}';
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id, fkUsuario) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId():", id, fkUsuario);

    var instrucaoSql = `
    SELECT nomeRestaurante, descricao, horario, localizacao, visita, anotacao, classificacao
    FROM usuarioRestaurante 
    LEFT JOIN restaurante ON idRestaurante = ${id} AND fkUsuario = ${fkUsuario}
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

function naoVisitado(categoria, vibe, preferencia, fkUsuario, classificacao, visita){
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function naoVisitado():", categoria, vibe, preferencia, fkUsuario, classificacao, visita);

    var instrucaoSql = `
        SELECT idRestaurante, nomeRestaurante, categoria, vibe, classificacao FROM restaurante
        LEFT JOIN usuarioRestaurante ON idRestaurante = fkRestaurante
        AND fkUsuario = ${fkUsuario}
        WHERE categoria = '${categoria}' AND vibe = '${vibe}' 
        AND preferencia = '${preferencia} AND visita <> 1';
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    anotar,
    buscar,
    buscarPorId,
    salvarResposta,
    buscarResultado,
    favoritos,
    naoVisitado
};