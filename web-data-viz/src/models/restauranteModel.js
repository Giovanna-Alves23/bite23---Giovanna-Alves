var database = require("../database/config")

function autenticar(nome, localizacao) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    
    var instrucaoSql = `
        SELECT idRestaurante, nomeRestaurante, localizacao FROM restaurante 
        WHERE nome = '${nome}' AND localizacao LIKE = '${localizacao}';
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
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function anotar():",fkUsuario, fkRestaurante, anotacao, star, visita);

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
        WHERE categoria = '${categoria}' AND vibe = '${vibe}' AND preferencia = '${preferencia}';
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(id) {
    console.log("ACESSEI O RESTAURANTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId():", id);

    var instrucaoSql = `
    SELECT * FROM restaurante WHERE idRestaurante = ${id}
    `;

    console.log("Executando SQL:\n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    anotar,
    buscar,
    buscarPorId
};