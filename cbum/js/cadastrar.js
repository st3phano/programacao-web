window.onload = async function () {
   carregar_cabecalho_pagina();
   document.getElementById("caixa_busca_input").
      setAttribute("disabled", "disabled");

   document.getElementById("formulario_cadastrar").
      addEventListener("keydown",
         async function (tecla_presionada) {
            if (tecla_presionada.key == "Enter") {
               cadastrar()
            }
         });
}

async function cadastrar() {
   var formulario_cadastrar = document.getElementById("formulario_cadastrar");

   var senha = formulario_cadastrar.elements["senha"].value;
   var confirmar_senha = formulario_cadastrar.elements["confirmar_senha"].value;
   if (senha != confirmar_senha) {
      alert("As senhas não correspondem!");
      return;
   }

   var resposta_cadastrar = await fetch("/cbum/php/cadastrar.php", {
      method: "POST",
      body: new FormData(formulario_cadastrar)
   });

   var cadastro_efetuado = await resposta_cadastrar.text();
   if (cadastro_efetuado) {
      alert("Cadastro efetuado com sucesso!");
      location.href = "/cbum/index.html";
   }
   else {
      alert("Falha ao se cadastrar!");
   }
}
