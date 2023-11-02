<?php
$id_produto = $_POST["id_produto"];

include "../conectar_mysql.php";
$conexao_mysql = conectar_mysql();

include "../validar_autenticacao.php";
if (!validar_autenticacao("admin", $conexao_mysql)) {
   echo "Autenticação de administrador necessária!";
   return;
}

$query_excluir_produto = "DELETE FROM cbum.carrinho
                          WHERE carrinho.id_produto = $id_produto;
                          DELETE FROM cbum.produto
                          WHERE id = $id_produto;";

$produto_foi_excluido_do_carrinho = mysqli_multi_query($conexao_mysql, $query_excluir_produto);
if (!$produto_foi_excluido_do_carrinho) {
   echo "Falha ao excluir produto do carrinho!";
   return;
}
$produto_foi_excluido = mysqli_next_result($conexao_mysql);
if (!$produto_foi_excluido) {
   echo "Falha ao excluir produto do banco de dados!";
   return;
}

include "../constantes/diretorio_imagens_produtos.php";
$caminho_imagem_produto = $diretorio_imagens_produtos . $_POST["id_produto"] . ".png";
if (file_exists($caminho_imagem_produto)) {
   unlink($caminho_imagem_produto);
}

echo "Produto excluído com sucesso!";
