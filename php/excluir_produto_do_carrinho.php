<?php
$id_produto = $_POST["id_produto"];
$query_excluir_produto_do_carrinho = "DELETE FROM cbum.carrinho
                                      WHERE carrinho.id_produto = $id_produto;";

include "conectar_mysql.php";
$conexao_mysql = conectar_mysql();

mysqli_query($conexao_mysql, $query_excluir_produto_do_carrinho);
if (mysqli_affected_rows($conexao_mysql) > 0) {
   echo true;
} else {
   echo false;
}
