<?php
$id_produto = $_POST["id_produto"];
$nova_quantidade_produto = $_POST["nova_quantidade_produto"];
$query_alterar_quantidade_produto = "UPDATE cbum.carrinho
                                     SET quantidade_produto = $nova_quantidade_produto
                                     WHERE id_produto = $id_produto;";

include "conectar_mysql.php";
$conexao_mysql = conectar_mysql();

mysqli_query($conexao_mysql, $query_alterar_quantidade_produto);
if (mysqli_affected_rows($conexao_mysql) > 0) {
   echo true;
} else {
   echo false;
}
