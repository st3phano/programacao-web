<?php
$usuario = $_POST["usuario"];
$senha = $_POST["senha"];

$query_autenticar_usuario = "UPDATE cbum.usuario
                             SET usuario.ultima_autenticacao = NOW()
                             WHERE usuario.nome = '$usuario' AND usuario.senha = '$senha';";

include "conectar_mysql.php";
$conexao_mysql = conectar_mysql();

mysqli_query($conexao_mysql, $query_autenticar_usuario);
if (mysqli_affected_rows($conexao_mysql) > 0) {
   if (session_start()) {
      $_SESSION["usuario"] = $usuario;
      echo true;
   } else {
      echo false;
   }
} else {
   echo false;
}
