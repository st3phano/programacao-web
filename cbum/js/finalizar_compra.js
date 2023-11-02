var tabela_produtos_carrinho_corpo;
var tabela_produtos_carrinho_total;
var caminho_arquivo_php_carregar_produtos_carrinho;
var produtos_carrinho;

window.onload = async function () {
   tabela_produtos_carrinho_corpo = document.getElementById("tabela_produtos_carrinho_corpo");
   tabela_produtos_carrinho_total = document.getElementById("tabela_produtos_carrinho_total");
   caminho_arquivo_php_carregar_produtos_carrinho = "/cbum/php/carregar_produtos_carrinho.php";

   carregar_cabecalho_pagina();
   document.getElementById("caixa_busca_input").
      setAttribute("disabled", "disabled");

   document.getElementById("credito").
      addEventListener("click",
         function () {
            mostrar_forma_pagamento(this.value);
         });

   document.getElementById("debito").
      addEventListener("click",
         function () {
            mostrar_forma_pagamento(this.value);
         });

   document.getElementById("pix").
      addEventListener("click",
         function () {
            mostrar_forma_pagamento(this.value);
         });

   produtos_carrinho = await filtrar_produtos(caminho_arquivo_php_carregar_produtos_carrinho);
   mostrar_produtos_carrinho();
   calcular_preco_total_carrinho();
   mostrar_preco_total_carrinho();
}

function mostrar_produtos_carrinho() {
   tabela_produtos_carrinho_corpo.innerHTML = "";
   for (var i = 0; i < produtos_carrinho.length; ++i) {
      var linha_produto = montar_linha_produto_carrinho(i);
      tabela_produtos_carrinho_corpo.innerHTML += linha_produto;
   }
}

function montar_linha_produto_carrinho(indice_produto) {
   var preco_produto = produtos_carrinho[indice_produto].preco;
   var quantidade_produto = produtos_carrinho[indice_produto].quantidade_produto;

   return `<div class="tabela_produtos_carrinho_linha">
            <div class="produto">${produtos_carrinho[indice_produto].nome}</div>
            <div class="preco-produto">R$ ${preco_produto}</div>
            <div class="quantidade-produto">${quantidade_produto}</div>
            <div class="preco-total-produto">R$ ${(preco_produto * quantidade_produto).toFixed(2)}</div>
           </div>`;
}

function calcular_preco_total_carrinho() {
   var preco_total_carrinho = 0;
   for (var i = 0; i < produtos_carrinho.length; ++i) {
      var preco_produto = produtos_carrinho[i].preco;
      var quantidade_produto = produtos_carrinho[i].quantidade_produto;

      preco_total_carrinho += preco_produto * quantidade_produto;
   }

   return preco_total_carrinho;
}

function mostrar_preco_total_carrinho() {
   var preco_total_carrinho = calcular_preco_total_carrinho();
   tabela_produtos_carrinho_total.innerHTML = "Total:<br>R$ " + preco_total_carrinho.toFixed(2);
}

async function mostrar_forma_pagamento(forma_pagamento) {
   if (produtos_carrinho.length == 0) {
      alert("Seu carrinho está vazio!");
      return;
   }

   var pagamento_dados = document.getElementById("pagamento_dados");
   if (forma_pagamento == "credito" || forma_pagamento == "debito") {
      pagamento_dados.innerHTML =
         `<input name="numero_cartao" maxlength="16" type="text" placeholder="Número do cartão">
          <input name="validade_cartao" type="month" placeholder="Validade">
          <input name="cvv_cartao" maxlength="3" type="text" placeholder="CVV">
          <input name="titular_cartao" type="text" placeholder="Nome do titular">
          <input name="cpf_titular_cartao" maxlength="11" type="text" placeholder="CPF do titular">`;
   }
   else {
      pagamento_dados.innerHTML = `<img src="../img/qr_code_pagamento.png">`
   }

   pagamento_dados.innerHTML +=
      `<button onclick="finalizar_compra()" type="button">
         <i class="fa-solid fa-check-to-slot"></i> Finalizar compra
      </button>`;
}

async function finalizar_compra() {
   var formulario_pagamento = document.getElementById("formulario_pagamento");

   var resposta_finalizar_compra = await fetch("/cbum/php/finalizar_compra.php", {
      method: "POST",
      body: new FormData(formulario_pagamento)
   });

   var resposta_finalizar_compra_body = await resposta_finalizar_compra.text();
   if (resposta_finalizar_compra_body == 0) {
      alert("Falha ao finalizar a compra!");
   }
   else if (resposta_finalizar_compra_body == -1) {
      alert("Seu carrinho está vazio!");
   }
   else if (resposta_finalizar_compra_body == -2) {
      alert("Preencha os dados corretamente!");
   }
   else if (resposta_finalizar_compra_body == -3) {
      alert("É necessário se autenticar para finalizar a compra!");
   }
   else {
      alert("Agradecemos a preferência!");
      location.href = "/cbum/index.html";
   }
}
document.getele
