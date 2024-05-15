CREATE DATABASE cbum;
USE cbum;

CREATE TABLE `produto` (
   `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
   `nome` VARCHAR(120) NOT NULL,
   `preco` DECIMAL(8,2) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `carrinho` (
   `id_produto` SMALLINT UNSIGNED NOT NULL,
   `quantidade_produto` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
   FOREIGN KEY (`id_produto`) REFERENCES produto (`id`)
   /*
   `id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
   PRIMARY KEY (`id`)
   */
);

CREATE TABLE `usuario` (
   `nome` VARCHAR(120) NOT NULL,
   `senha` VARCHAR(120) NOT NULL,
   `ultima_autenticacao` DATETIME NULL,
   PRIMARY KEY (`nome`)
);

INSERT INTO `usuario`
(nome, senha)
VALUES
('admin', '1234');

/*
CREATE TABLE `carrinho_contem_produto` (
   `id_carrinho` SMALLINT UNSIGNED NOT NULL,
   `id_produto` SMALLINT UNSIGNED NOT NULL,
   `quantidade_produto` SMALLINT UNSIGNED NOT NULL DEFAULT 1,
   PRIMARY KEY (`id_carrinho`, `id_produto`),
   FOREIGN KEY (`id_carrinho`) REFERENCES carrinho (`id`),
   FOREIGN KEY (`id_produto`) REFERENCES produto (`id`)
);
*/
