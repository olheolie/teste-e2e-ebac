/// <reference types="cypress" />

import produtosPage from "../support/page_objects/produtos.page";
import { fa, faker, fakerEN } from '@faker-js/faker';


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {

  beforeEach(() => {
      cy.visit('/')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

      cy.get('.product-block').eq(2).click()
      cy.fixture('produtos').then(dados => {
        produtosPage.addProdutoCarrinho(
          dados[0].tamanho,
          dados[0].cor,
          dados[0].quantidade) })
      cy.get('.woocommerce-message').should('contain', '2 × “Josie Yoga Jacket” foram adicionados no seu carrinho.')
         
      cy.get('.tbay-woocommerce-breadcrumb > :nth-child(1) > a').click() 
                  
    
    cy.get('.product-block').eq(7).click()
    cy.fixture('produtos').then(dados => {
      produtosPage.addProdutoCarrinho(
        dados[1].tamanho,
        dados[1].cor,
        dados[1].quantidade) })
    cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.')
  
    cy.fixture('produtos').then(dados =>{
      produtosPage.visitarProduto(dados[2].Produto)
      produtosPage.addProdutoCarrinho(
        dados[2].tamanho,
        dados[2].cor,
        dados[2].quantidade ) })

    cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.')

    cy.fixture('produtos').then(dados => {
      produtosPage.visitarProduto(dados[3].Produto)
      produtosPage.addProdutoCarrinho(
        dados[3].tamanho,
        dados[3].cor,
        dados[3].quantidade
      )
    cy.get('.woocommerce-message').should('contain', dados[3].Produto)
    })
    cy.get('.woocommerce-message > .button').click()
    cy.get('.cart-subtotal > td').should('contain', 'R$409,50')
    cy.get('.checkout-button').click()
    
    var nome = faker.person.firstName()
    var email =faker.internet.email(nome)
    var sobrenome = faker.person.lastName()

    
  cy.get('#billing_first_name').type(nome)
  cy.get('#billing_last_name').type(sobrenome)
  cy.get('#billing_address_1').type(faker.address.streetAddress(false))
  cy.get('#billing_city').type(faker.address.city())
  cy.get('#billing_postcode').type('00000-000')
  cy.get('#billing_phone').type('44944524444')
  cy.get('#billing_email').type(email)

  cy.get('#payment_method_cod').click()
  cy.get('#terms').click()
  cy.get('#place_order').click()
  });   


})