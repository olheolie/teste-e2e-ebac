class produtosPage {
   
    visitarUrl(){
        cy.visit('produtos/')
    }
    buscarProduto(Produto){
        cy.get('[name="s"]').eq(1).type(Produto)
        cy.get('.button-search').eq(1).click()
    }   
    buscarProdutoLista(Produto){
        cy.get('.products > .row')
        .contains(Produto)
        .click()
    }
    visitarProduto(Produto){
        let UrlFormatada = Produto.replace(/ /g, '-')
        cy.visit(`produtos/${UrlFormatada}`)
    }
    addProdutoCarrinho(tamanho, cor, quantidade) {
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get(`.button-variable-item-${cor}`).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    }
}

export default new produtosPage()