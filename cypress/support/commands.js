Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () { 

    cy.get('#firstName').type('Alexandre'); 

    cy.get('#lastName').type('Dangio'); 

    cy.get('#email').type('aledangio@gmail.com'); 

    cy.get('#open-text-area').type('Teste', { delay: 0 }); 

    cy.get('.button').click(); 

}) 
