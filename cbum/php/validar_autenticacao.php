<?php
function validar_autenticacao($usuario, $conexao_mysql)
{
   $minutos_autenticacao_valida = 3;
   $query_validar_autenticacao = "SELECT DATE_ADD(usuario.ultima_autenticacao,
                                                  INTERVAL $minutos_autenticacao_valida MINUTE) > NOW()
                                  FROM cbum.usuario
                                  WHERE usuario.nome = '$usuario';";

   $usuario_esta_autenticado = mysqli_fetch_column(mysqli_query($conexao_mysql, $query_validar_autenticacao));

   return $usuario_esta_autenticado;
}
