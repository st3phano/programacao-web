<?php
include "conectar_mysql.php";
$conexao_mysql = conectar_mysql();

$query_verificar_carrinho = "SELECT *
                             FROM cbum.carrinho;";
mysqli_query($conexao_mysql, $query_verificar_carrinho);
if (mysqli_affected_rows($conexao_mysql) == 0) {
   echo -1;
   return;
}

$forma_pagamento = $_POST["forma_pagamento"];
if ($forma_pagamento == "credito" || $forma_pagamento == "debito") {
   if (
      strlen($_POST["numero_cartao"]) != 16 ||
      strlen($_POST["validade_cartao"]) != 7 ||
      strlen($_POST["cvv_cartao"]) != 3 ||
      strlen($_POST["titular_cartao"]) < 3 ||
      strlen($_POST["cpf_titular_cartao"]) != 11
   ) {
      echo -2;
      return;
   }
}

session_start();
include "validar_autenticacao.php";
if (!isset($_SESSION["usuario"]) || !validar_autenticacao($_SESSION["usuario"], $conexao_mysql)) {
   echo -3;
   return;
}

$query_limpar_carrinho = "DELETE FROM cbum.carrinho;";
mysqli_query($conexao_mysql, $query_limpar_carrinho);
if (mysqli_affected_rows($conexao_mysql) > 0) {
   echo 1;
} else {
   echo 0;
}
