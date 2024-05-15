<?php
$id_produto = $_POST["id_produto"];
$query_verificar_quantidade_produto = "SELECT quantidade_produto
                                       FROM carrinho
                                       WHERE id_produto = $id_produto;";

include "conectar_mysql.php";
$conexao_mysql = conectar_mysql();

$quantidade_produto = mysqli_fetch_column(mysqli_query($conexao_mysql, $query_verificar_quantidade_produto));

if ($quantidade_produto > 0) {
   $query_adicionar_produto_carrinho = "UPDATE carrinho
                                        SET quantidade_produto = quantidade_produto + 1
                                        WHERE id_produto = $id_produto;";
} else {
   $query_adicionar_produto_carrinho = "INSERT INTO carrinho
                                        (id_produto)
                                        VALUES
                                        ($id_produto);";
}

mysqli_query($conexao_mysql, $query_adicionar_produto_carrinho);
if (mysqli_affected_rows($conexao_mysql) > 0) {
   echo true;
} else {
   echo false;
}
