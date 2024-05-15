var caixa_produtos;
var caminho_arquivo_php_carregar_produtos;
var produtos;

window.onload = async function () {
   caixa_produtos = document.getElementById("caixa_produtos");
   caminho_arquivo_php_carregar_produtos = "/cbum/php/carregar_produtos.php";

   carregar_cabecalho_pagina();
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
               <img id="imagem_produto_${produtos[indice_produto].id}"
                src="/cbum/img/produtos/${produtos[indice_produto].id}.png">
            </div>
            <div class="card-info">
               <div>${produtos[indice_produto].nome}</div>
               <div class="card-info-preco">R$ ${produtos[indice_produto].preco}</div>
               <div onclick="adicionar_ao_carrinho(${produtos[indice_produto].id})"
                class="card-info-botao" id="botao_adicionar_${produtos[indice_produto].id}">
                  <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
               </div>
            </div>
           </div>`;
}

async function adicionar_ao_carrinho(id_produto) {
   var form_data = new FormData();
   form_data.append("id_produto", id_produto);

   var resposta_adicionar_ao_carrinho = await fetch("/cbum/php/adicionar_ao_carrinho.php", {
      method: "POST",
      body: form_data
   });

   var produto_adicionado_ao_carrinho = await resposta_adicionar_ao_carrinho.text();
   if (produto_adicionado_ao_carrinho) {
      responder_visualmente_adicionar_ao_carrinho(id_produto)
   } else {
      alert("Falha ao adicionar o produto ao carrinho!");
   }
}

function responder_visualmente_adicionar_ao_carrinho(id_produto) {
   var botao_adicionar = document.getElementById("botao_adicionar_" + id_produto);
   var botao_adicionar_innerHTML = botao_adicionar.innerHTML;
   var botao_adicionar_backgroundColor = botao_adicionar.style.backgroundColor;
   var botao_adicionar_pointerEvents = botao_adicionar.style.pointerEvents;
   botao_adicionar.innerHTML = "Produto Adicionado!"
   botao_adicionar.style.backgroundColor = "green";
   botao_adicionar.style.pointerEvents = "none";

   var imagem_produto = document.getElementById("imagem_produto_" + id_produto);
   var imagem_produto_width = imagem_produto.style.width;
   var imagem_produto_height = imagem_produto.style.height;
   imagem_produto.style.width = "100%";
   imagem_produto.style.height = "100%";

   setTimeout(function () {
      botao_adicionar.innerHTML = botao_adicionar_innerHTML;
      botao_adicionar.style.backgroundColor = botao_adicionar_backgroundColor;
      botao_adicionar.style.pointerEvents = botao_adicionar_pointerEvents;

      imagem_produto.style.width = imagem_produto_width;
      imagem_produto.style.height = imagem_produto_height;
   }, 750);
}
