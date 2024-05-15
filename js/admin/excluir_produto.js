var caixa_produtos;
var caminho_arquivo_php_carregar_produtos;
var produtos;

window.onload = async function () {
   caixa_produtos = document.getElementById("caixa_produtos");
   caminho_arquivo_php_carregar_produtos = "/cbum/php/carregar_produtos.php";

   carregar_cabecalho_pagina(true);
   filtrar_e_mostrar_produtos();

   document.getElementById("caixa_busca_input").
      addEventListener("keydown",
         async function (tecla_presionada) {
            if (tecla_presionada.key == "Enter") {
               filtrar_e_mostrar_produtos();
            }
         });

   document.getElementById("caixa_busca_lupa").
      addEventListener("click",
         async function () {
            filtrar_e_mostrar_produtos();
         });
}


async function filtrar_e_mostrar_produtos() {
   produtos = await filtrar_produtos(caminho_arquivo_php_carregar_produtos);
   mostrar_produtos();
}

function mostrar_produtos() {
   caixa_produtos.innerHTML = "";
   for (var i = 0; i < produtos.length; ++i) {
      var card_produto = montar_card_produto(i);
      caixa_produtos.innerHTML += card_produto;
   }
}

function montar_card_produto(indice_produto) {
   return `<div class="card">
            <div class="card-img">
               <img src="/cbum/img/produtos/${produtos[indice_produto].id}.png">
            </div>
            <div class="card-info">
               <div>${produtos[indice_produto].nome}</div>
               <div class="card-info-preco">R$ ${produtos[indice_produto].preco}</div>
               <div onclick="excluir_produto(${produtos[indice_produto].id})"
                class="card-info-botao">
                  <i class="fa-solid fa-store-slash"></i> Excluir Produto
               </div>
            </div>
           </div>`;
}

async function excluir_produto(id_produto) {
   if (!confirm("Tem certeza que deseja excluir esse produto?")) {
      return;
   }

   var form_data = new FormData();
   form_data.append("id_produto", id_produto);

   var resposta_excluir_produto = await fetch("/cbum/php/admin/excluir_produto.php", {
      method: "POST",
      body: form_data
   });

   var resposta_excluir_produto_body = await resposta_excluir_produto.text();
   alert(resposta_excluir_produto_body);
   filtrar_e_mostrar_produtos();
}
