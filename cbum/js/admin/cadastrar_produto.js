window.onload = async function () {
   carregar_cabecalho_pagina(true);
   document.getElementById("caixa_busca_input").
      setAttribute("disabled", "disabled");

   document.getElementById("nome_produto").
      addEventListener("input",
         function () {
            document.getElementById("card_nome_produto").innerHTML = this.value;
         });

   document.getElementById("preco_produto").
      addEventListener("input",
         function () {
            document.getElementById("card_preco_produto").innerHTML = "R$ " + this.value;
         });

   document.getElementById("imagem_produto").
      addEventListener("change",
         function () {
            if (!this.files[0]) {
               return;
            }
            var arquivo_imagem_produto = this.files[0];

            var card_imagem_produto = document.getElementById("card_imagem_produto");
            card_imagem_produto.src = URL.createObjectURL(arquivo_imagem_produto); // cria uma URL representando a imagem
            card_imagem_produto.onload = function () {
               URL.revokeObjectURL(card_imagem_produto.src); // libera a memória do objeto URL depois de carregar a imagem
            }
         });
}

async function cadastrar_produto() {
   var formulario_cadastrar_produto = document.getElementById("formulario_cadastrar_produto");

   var resposta_cadastrar_produto = await fetch("/cbum/php/admin/cadastrar_produto.php", {
      method: "POST",
      body: new FormData(formulario_cadastrar_produto)
   })

   var resposta_cadastrar_produto_body = await resposta_cadastrar_produto.text();
   alert(resposta_cadastrar_produto_body);
}
