async function carregar_produtos(caminho_arquivo_php_carregar_produtos, nome_produto_contem = "") {
   var form_data = new FormData();
   form_data.append("nome_produto_contem", nome_produto_contem);

   var retorno_carregar_produtos = await fetch(caminho_arquivo_php_carregar_produtos, {
      method: "POST",
      body: form_data
   });

   var retorno_carregar_produtos_json = await retorno_carregar_produtos.json();
   return retorno_carregar_produtos_json;
}
