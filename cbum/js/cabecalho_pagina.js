function carregar_cabecalho_pagina(pagina_admin = false) {
   document.getElementById("cabecalho_pagina").
      innerHTML =
      `<header>
         <a href="/cbum/index.html">
            <img id="logomarca" src="/cbum/img/biceps.svg">
         </a>

         <div id="barra_superior">
            <div id="caixa_busca">
               <input id="caixa_busca_input" type="text" placeholder="Buscar produto">
               <img id="caixa_busca_lupa" src="/cbum/img/lupa.svg">
            </div>

            <div id="icone_menu" onclick="mostrar_menu()">
               <span class="fatia-pao"></span>
               <span class="fatia-pao"></span>
               <span class="fatia-pao"></span>
            </div>
         </div>
      </header>

      <div id="menu" style="display: none;">
      </div>`;

   if (pagina_admin) {
      document.getElementById("menu").
         innerHTML =
         `<a class="menu-item" href="/cbum/paginas/admin/cadastrar_produto.html">
            <i class="fa-solid fa-plus"></i> CADASTRAR PRODUTO
         </a>
         <a class="menu-item" href="/cbum/paginas/admin/excluir_produto.html">
            <i class="fa-solid fa-store-slash"></i> EXCLUIR PRODUTO
         </a>
         <a class="menu-item" href="/cbum/paginas/autenticar.html">
            <i class="fa-solid fa-right-to-bracket"></i> AUTENTICAR
         </a>`
   }
   else {
      document.getElementById("menu").
         innerHTML =
         `<a class="menu-item" href="/cbum/paginas/produtos.html">
            <i class="fa-solid fa-store"></i> PRODUTOS
         </a>
         <a class="menu-item" href="/cbum/paginas/carrinho.html">
            <i class="fa-solid fa-cart-shopping"></i> CARRINHO
         </a>
         <a class="menu-item" href="/cbum/paginas/finalizar_compra.html">
            <i class="fa-solid fa-wallet"></i> FINALIZAR COMPRA
         </a>
         <a class="menu-item" href="/cbum/paginas/autenticar.html">
            <i class="fa-solid fa-right-to-bracket"></i> AUTENTICAR
         </a>
         <a class="menu-item" href="/cbum/paginas/cadastrar.html">
            <i class="fa-solid fa-right-to-bracket"></i> CADASTRAR
         </a>`
   }

   document.getElementById("icone_menu").
      addEventListener("click",
         function () {
            icone_menu.classList.toggle("active");
         });
}

async function filtrar_produtos(caminho_arquivo_php_carregar_produtos) {
   var texto_buscar =
      document.getElementById("caixa_busca_input").
         value.
         trim().
         toLowerCase();

   return await carregar_produtos(caminho_arquivo_php_carregar_produtos, texto_buscar);
}

function mostrar_menu() {
   var menu = document.getElementById("menu");
   if (menu.style.display == "none") {
      menu.style.display = "flex";
   }
   else {
      menu.style.display = "none";
   }
}
