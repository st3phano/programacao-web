<?php
function conectar_mysql()
{
   $senha = "root";
   $conexao = mysqli_connect("localhost:3306", "root", $senha, "cbum");

   return $conexao;
}
