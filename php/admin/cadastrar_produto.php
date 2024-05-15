<?php
include "../constantes/limites_input.php";

$nome_produto = $_POST["nome_produto"];
if (strlen($nome_produto) < 1 || strlen($nome_produto) > $limite_max_input_text) {
   echo "Nome inválido!";
   return;
}

$preco_produto = $_POST["preco_produto"];
if ($preco_produto <= 0 || $preco_produto > $limite_max_input_number) {
   echo "Preço inválido!";
   return;
}

$imagem_produto = $_FILES["imagem_produto"];
if ($imagem_produto["type"] != "image/png") {
   echo "Insira uma imagem .png!";
   return;
}

include "../conectar_mysql.php";
$conexao_mysql = conectar_mysql();

include "../validar_autenticacao.php";
if (!validar_autenticacao("admin", $conexao_mysql)) {
   echo "Autenticação de administrador necessária!";
   return;
}

$query_adicionar_produto = "INSERT INTO cbum.produto
                            (nome, preco)
                            VALUES
                            ('$nome_produto', $preco_produto);";

mysqli_query($conexao_mysql, $query_adicionar_produto);
if (mysqli_affected_rows($conexao_mysql) < 1) {
   echo "Falha ao adicionar produto ao banco de dados!";
   return;
}
$nome_imagem_produto = mysqli_insert_id($conexao_mysql) . ".png";

include "../constantes/diretorio_imagens_produtos.php";
$caminho_imagem_produto = $diretorio_imagens_produtos . $nome_imagem_produto;
$img_foi_salva = move_uploaded_file($imagem_produto["tmp_name"], $caminho_imagem_produto);
if (!$img_foi_salva) {
   echo "Falha ao carregar a imagem!";
   return;
} else {
   echo "Produto cadastrado com sucesso!";
}
