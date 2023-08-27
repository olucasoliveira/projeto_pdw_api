CREATE TABLE categoria
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao VARCHAR(200)
);

CREATE TABLE status_item
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(50),
    descricao CHAR(150)
);

CREATE TABLE status_usuario
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(50),
    descricao CHAR(150)
);

CREATE TABLE tipo_usuario
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50),
    descricao CHAR(150)
);

CREATE TABLE usuario
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150),
    email VARCHAR(150) UNIQUE,
    senha VARCHAR(150),
    dt_admin DATE,
    tipo_admin INT,
    status INT,
    tipo_usuario INT,
    FOREIGN KEY (tipo_admin) REFERENCES tipo_usuario(id),
    FOREIGN KEY (status) REFERENCES status_usuario(id),
    FOREIGN KEY (tipo_usuario) REFERENCES tipo_usuario(id)
);

CREATE TABLE itens
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(200),
    id_categoria INT,
    preco FLOAT,
    descricao VARCHAR(500),
    status INT,
    dt_edicao DATE,
    periodicidade INT,
    id_vendedor INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id),
    FOREIGN KEY (status) REFERENCES status_item(id),
    FOREIGN KEY (id_vendedor) REFERENCES usuario(id)
);

CREATE TABLE transacoes
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_comprador INT,
    id_vendedor INT,
    id_item INT,
    dt_transacao DATE,
    valor FLOAT,
    FOREIGN KEY (id_comprador) REFERENCES usuario(id),
    FOREIGN KEY (id_vendedor) REFERENCES usuario(id),
    FOREIGN KEY (id_item) REFERENCES itens(id)
);


