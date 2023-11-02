<?php
$nome_produto_contem = $_POST["nome_produto_contem"];
$query_listar_produtos = "SELECT *
                          FROM cbum.produto
                          WHERE produto.nome LIKE '%$nome_produto_contem%';";

include "conectar_mysql.php";
$conexao_mysql = conectar_mysql();

$resultado_listar_produtos = mysqli_query($conexao_mysql, $query_listar_produtos);
$tabela_produtos = array();
while ($linha = mysqli_fetch_assoc($resultado_listar_produtos)) {
   array_push($tabela_produtos, $linha);
}

$tabela_produtos_json = json_encode($tabela_produtos);
echo $tabela_produtos_json;
