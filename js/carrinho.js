var caixa_produtos_carrinho;
var caminho_arquivo_php_carregar_produtos_carrinho;
var produtos_carrinho;

window.onload = async function () {
   caixa_produtos_carrinho = document.getElementById("caixa_produtos_carrinho");
   caminho_arquivo_php_carregar_produtos_carrinho = "/cbum/php/carregar_produtos_carrinho.php";

   carregar_cabecalho_pagina();
   filtrar_e_mostrar_produtos_carrinho();

   document.getElementById("caixa_busca_input").
      addEventListener("keydown",
         async function (tecla_presionada) {
            if (tecla_presionada.key == "Enter") {
               filtrar_e_mostrar_produtos_carrinho();
            }
         });

   document.getElementById("caixa_busca_lupa").
      addEventListener("click",
         async function () {
            filtrar_e_mostrar_produtos_carrinho();
         });
}

async function filtrar_e_mostrar_produtos_carrinho() {
   produtos_carrinho = await filtrar_produtos(caminho_arquivo_php_carregar_produtos_carrinho);
   mostrar_produtos_carrinho();
}

function mostrar_produtos_carrinho() {
   caixa_produtos_carrinho.innerHTML = "";
   for (var i = 0; i < produtos_carrinho.length; ++i) {
      var card_produto = montar_card_produto_carrinho(i);
      caixa_produtos_carrinho.innerHTML += card_produto;
   }
}

function montar_card_produto_carrinho(indice_produto) {
   return `<div class="card">
            <div class="card-img">
               <img id="imagem_produto_${produtos_carrinho[indice_produto].id}"
                src="/cbum/img/produtos/${produtos_carrinho[indice_produto].id}.png">
            </div>
            <div class="card-info">
               <div>${produtos_carrinho[indice_produto].nome}</div>
               <div class="card-info-preco">R$ ${produtos_carrinho[indice_produto].preco}</div>
               <div class="card-info-botoes" id="botoes_${produtos_carrinho[indice_produto].id}">
                  <div onclick="alterar_quantidade_produto_carrinho(${produtos_carrinho[indice_produto].id}, +1)"
                   class="card-info-botao adicionar-quantidade">
                     +
                  </div>
                  <div class="card-info-quantidade" id="quantidade_produto_${produtos_carrinho[indice_produto].id}">
                     ${produtos_carrinho[indice_produto].quantidade_produto}
                  </div>
                  <div onclick="alterar_quantidade_produto_carrinho(${produtos_carrinho[indice_produto].id}, -1)"
                   class="card-info-botao">
                     -
                  </div>
               </div>
            </div>
           </div>`;
}

async function alterar_quantidade_produto_carrinho(id_produto, quantidade_adicionar) {
   var form_data_id_produto = new FormData();
   form_data_id_produto.append("id_produto", id_produto);

   var campo_quantidade_produto = document.getElementById("quantidade_produto_" + id_produto);
   var nova_quantidade_produto = parseInt(campo_quantidade_produto.innerHTML) + quantidade_adicionar;
   if (nova_quantidade_produto == 0) {
      excluir_produto_do_carrinho(form_data_id_produto);
   }
   else {
      form_data_id_produto.append("nova_quantidade_produto", nova_quantidade_produto);

      var resposta_alterar_quantidade_produto_carrinho = await fetch("/cbum/php/alterar_quantidade_produto_carrinho.php", {
         method: "POST",
         body: form_data_id_produto
      });

      var alterou_quantidade = await resposta_alterar_quantidade_produto_carrinho.text();
      if (alterou_quantidade) {
         responder_visualmente_alterar_quantidade_produto_carrinho(id_produto, quantidade_adicionar);
         campo_quantidade_produto.innerHTML = nova_quantidade_produto;
      }
      else {
         alert("Falha ao atualizar a quantidade do produto!");
      }
   }
}

function responder_visualmente_alterar_quantidade_produto_carrinho(id_produto, quantidade_adicionar) {
   var botoes = document.getElementById("botoes_" + id_produto);
   var botoes_pointerEvents = botoes.style.pointerEvents;
   botoes.style.pointerEvents = "none";

   var imagem_produto = document.getElementById("imagem_produto_" + id_produto);
   var imagem_produto_width = imagem_produto.style.width;
   var imagem_produto_height = imagem_produto.style.height;
   if (quantidade_adicionar > 0) {
      imagem_produto.style.width = "100%";
      imagem_produto.style.height = "100%"
   }
   else {
      imagem_produto.style.width = "60%";
      imagem_produto.style.height = "60%"
   }

   setTimeout(function () {
      botoes.style.pointerEvents = botoes_pointerEvents;
      imagem_produto.style.width = imagem_produto_width;
      imagem_produto.style.height = imagem_produto_height;
   }, 500);
}

async function excluir_produto_do_carrinho(form_data_id_produto) {
   var resposta_excluir_produto_do_carrinho = await fetch("/cbum/php/excluir_produto_do_carrinho.php", {
      method: "POST",
      body: form_data_id_produto
   });

   var excluiu_produto_do_carrinho = await resposta_excluir_produto_do_carrinho.text();
   if (excluiu_produto_do_carrinho) {
      filtrar_e_mostrar_produtos_carrinho();
   }
   else {
      alert("Falha ao excluir o produto do carrinho!");
   }
}
