<?php
include "constantes/limites_input.php";

$usuario = $_POST["usuario"];
if (strlen($usuario) < 1 || strlen($usuario) > $limite_max_input_text) {
   echo false;
   return;
}

$senha = $_POST["senha"];
if (strlen($senha) < 1 || strlen($senha) > $limite_max_input_text) {
   echo false;
   return;
}

$query_cadastrar_usuario = "INSERT INTO cbum.usuario
                            (nome, senha)
                            VALUES
                            ('$usuario', '$senha');";

include "conectar_mysql.php";
$conexao_mysql = conectar_mysql();

try {
   mysqli_query($conexao_mysql, $query_cadastrar_usuario);
   echo true;
} catch (mysqli_sql_exception) {
   echo false;
}
