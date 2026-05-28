CREATE DATABASE bite23;
USE bite23;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nomeUsuario VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(20)
);

CREATE TABLE restaurante (
idRestaurante INT PRIMARY KEY AUTO_INCREMENT,
nomeRestaurante VARCHAR(45),
descricao VARCHAR(500),
horario VARCHAR(300),
localizacao VARCHAR(100),
categoria VARCHAR(10),
vibe VARCHAR(12)
);

CREATE TABLE usuarioRestaurante (
fkRestaurante INT,
fkUsuario INT,
anotacao VARCHAR(500),
classificacao INT,
CONSTRAINT fkComposta
PRIMARY KEY (fkRestaurante, fkUsuario),
FOREIGN KEY (fkRestaurante) REFERENCES restaurante (idRestaurante),
FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);

CREATE TABLE quiz (
idQuiz INT
fkUsuario INT,
aconchegante INT,
romantica INT,
despojada INT,
classica INT,
chique INT,
CONSTRAINT const_fkUsuario
FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);