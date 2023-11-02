window.onload = async function () {
   carregar_cabecalho_pagina();
   document.getElementById("caixa_busca_input").
      setAttribute("disabled", "disabled");

   document.getElementById("formulario_autenticar").
      addEventListener("keydown",
         async function (tecla_presionada) {
            if (tecla_presionada.key == "Enter") {
               autenticar()
            }
         });
}

async function autenticar() {
   var formulario_autenticar = document.getElementById("formulario_autenticar");

   var resposta_autenticar = await fetch("/cbum/php/autenticar.php", {
      method: "POST",
      body: new FormData(formulario_autenticar)
   });

   var credenciais_validas = await resposta_autenticar.text();
   if (credenciais_validas) {
      var usuario = formulario_autenticar.elements["usuario"].value.toLowerCase();
      if (usuario == "admin")
         location.href = "/cbum/paginas/admin/cadastrar_produto.html";
      else
         location.href = "/cbum/index.html";
   }
   else {
      alert("Credenciais inválidas!");
   }
}
