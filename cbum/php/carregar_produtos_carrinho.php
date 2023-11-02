<?php
$nome_produto_contem = $_POST["nome_produto_contem"];
$query_listar_produtos_carrinho = "SELECT produto.id, produto.nome, produto.preco, carrinho.quantidade_produto
                                   FROM cbum.produto
                                   INNER JOIN cbum.carrinho ON produto.id = carrinho.id_produto
                                   WHERE produto.nome LIKE '%$nome_produto_contem%';";

include "conectar_mysql.php";
$conexao_mysql = conectar_mysql();

$resultado_listar_produtos_carrinho = mysqli_query($conexao_mysql, $query_listar_produtos_carrinho);
$tabela_produtos_carrinho = array();
while ($linha = mysqli_fetch_assoc($resultado_listar_produtos_carrinho)) {
   array_push($tabela_produtos_carrinho, $linha);
}

$tabela_produtos_carrinho_json = json_encode($tabela_produtos_carrinho);
echo $tabela_produtos_carrinho_json;
