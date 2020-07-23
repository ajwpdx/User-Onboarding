/// <reference types="cypress" />

describe('Check submission', () => {
    it('can navigate to the site;', () => {
        cy.visit('http://localhost:3000/')
    })
    it('input name', () => {
        cy.get('input[name="name"]')
        .type('Bob Ross')
        .should('have.value', 'Bob Ross')
    })
    it('input email', () => {
        cy.get('input[name="email"]')
        .type('Bob@Ross.com')
        .should('have.value', 'Bob@Ross.com')
    })
    it('input password', () => {
        cy.get('input[name="password"]')
        .type('password23')
        .should('have.value', 'password23')
    })
    it('mark terms box', () => {
        cy.get('input[name="terms"]')
      .check().should('be.checked')
    })
    it('submit form to create new user', () => {
        cy.get('.submit-btn').click()
        cy.contains('Bob Ross')
    })

})

describe('Check form validation',() =>{
    it('submit button disabled', () => {
        cy.get('.submit-btn').should('be.disabled')
    })
    it('name validation error', () => {
        cy.get('input[name="name"]')
        .type('br')
        cy.get('.errors').contains('Username must be at least 3 characters')
        
        cy.get('input[name="name"]')
        .type('br')
        cy.get('.errors').contains('Username must be at least 3 characters').should('not.exist')
    })
    it('email validation error', () => {
        cy.get('input[name="email"]')
        .type('br')
        cy.get('.errors').contains('Email must be valid')
        
        cy.get('input[name="email"]')
        .type('oss@email.com')
        cy.get('.errors').contains('Email must be valid').should('not.exist')
    })

    it('password validation error', () => {
        cy.get('input[name="password"]')
        .type('pa')
        cy.get('.errors').contains('Password must be at least 3 characters')

        cy.get('input[name="password"]')
        .type('ssword')
        cy.get('.errors').contains('Password must be at least 3 characters').should('not.exist')


    })
})