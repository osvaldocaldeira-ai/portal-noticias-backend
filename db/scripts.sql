CREATE TABLE administrador(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(10) NOT NULL
);

INSERT INTO administrador (nome, email, senha)
VALUES (
 'Adiministrador Geral',
     'admin@gmail.com',
     '123456'
); 