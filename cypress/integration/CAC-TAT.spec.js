/// <reference types="Cypress" /> 

describe('Central de Atendimento ao Cliente TAT', function () { 

    beforeEach( 

        () => { 

            cy.visit('./src/index.html'); 

        } 

    ) 

    it('verifica o titulo da aplicação', function () { 

        cy.visit('./src/index.html'); 

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') 

    }) 

    it('preenche os campos obrigatórios e envia o formulário', function () { 

        cy.get('#firstName').type('Alexandre'); 

        cy.get('#lastName').type('Dangio'); 

        cy.get('#email').type('aledangio@gmail.com'); 

        cy.get('#open-text-area').type('Agradeço a oportunidade', { delay: 0 }); 

        cy.get('.button').click(); 

        cy.get('.success > strong').should('be.visible'); 

    }) 

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () { 

        cy.get('#firstName').type('Alexandre'); 

        cy.get('#lastName').type('Dangio'); 

        cy.get('#email').type('aledangio#gmail.com'); 

        cy.get('#open-text-area').type('Agradeço a oportunidade', { delay: 0 }); 

        cy.get('.button').click(); 

        cy.get('.error').should('be.visible'); 

    }) 

    it('Campo telefone valores não numericos', function () { 

        cy.get('#phone') 

            .type('abcde') 

            .should('have.value', ''); 

    }) 

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () { 

        cy.get('#phone-checkbox').click(); 

        cy.get('.phone-label-span').should('be.visible'); 

    }) 

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () { 

        cy.get('#firstName').type('Alexandre').should('have.value', 'Alexandre'); 

        cy.get('#firstName').clear().should('have.value', '') 

        cy.get('#lastName') 

            .type('Dangio') 

            .should('have.value', 'Dangio') 

            .clear().should('have.value', '') 

        cy.get('#email').type('aledangio@gmail.com').should('have.value', 'aledangio@gmail.com'); 

        cy.get('#email').clear().should('have.value', '') 

        cy.get('#phone').type('993049410').should('have.value', '993049410'); 

        cy.get('#phone').clear().should('have.value', '') 

    }) 

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () { 

        cy.get('.button').click(); 

        cy.get('.error').should('be.visible'); 

    }) 

    it('envia o formuário com sucesso usando um comando customizado', function () { 

        cy.fillMandatoryFieldsAndSubmit() 

        cy.get('.success > strong').should('be.visible'); 

    }) 

    it('seleciona um produto (YouTube) por seu texto', function () { 

        cy.get('#product') 

            .select('YouTube') 

            .should('have.value', 'youtube') 

    }) 

    it('seleciona um produto (Mentoria) por seu valor (value)', function () { 

        cy.get('#product') 

            .select('mentoria') 

            .should('have.value', 'mentoria') 

    }) 

    it('seleciona um produto (Blog) por seu índice', function () { 

        cy.get('#product') 

            .select(1) 

            .should('have.value', 'blog') 

    }) 

    it('marca o tipo de atendimento "Feedback"', function () { 

        cy.get('input[type="radio"][value = "feedback"]') 

            .check() 

            .should('have.value', 'feedback') 

    }) 

    it('marca cada tipo de atendimento', function () { 

        cy.get('input[type="radio"]') 

            .should('have.length', 3) 

            .each(function ($radio) { 

                cy.wrap($radio).check() 

                cy.wrap($radio).should('be.checked') 

            }) 

    }) 

    it('marca ambos checkboxes, depois desmarca o último', function () { 

        cy.get('input[type="checkbox"]') 

            .check() 

            .should('be.checked') 

            .last() 

            .uncheck() 

            .should('not.be.checked') 

    }) 

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () { 

        cy.get('#phone-checkbox').check(); 

        cy.get('.phone-label-span').should('be.visible'); 

    }) 

    it('seleciona um arquivo da pasta fixtures', function () { 

        cy.get('input[type="file"]#file-upload') //vai pegar o input 

            .should('not.have.value') //vai mostrar que não tem nada selecionado 

            .selectFile('./cypress/fixtures/example.json')//vai fazer o upload de arquivos com o caminho do arquivo 

            .should(function ($input) { 

                expect($input[0].files[0].name).to.equal('example.json') 

            })//vai verificar o input 0 (primeiro) e o files 0 (primeiro) e comparar com o nome do arquivo acima 

    }) 

    it('seleciona um arquivo simulando um drag-and-drop', function () { 

       cy.get('input[type="file"]#file-upload')  //vai pegar o input 

            .should('not.have.value') //vai mostrar que não tem nada selecionado 

            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' }) 

            .should(function ($input) { 

                expect($input[0].files[0].name).to.equal('example.json') 

            })//vai verificar o input 0 (primeiro) e o files 0 (primeiro) e comparar com o nome do arquivo acima 

    }) 

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){ 

        cy.fixture('example.json').as('sampleFile') //informei o nome do arquivo no fixture e no alias (as) criei um nome 

        cy.get('input[type="file"]#file-upload')//vai pegar o input 

        .selectFile('@sampleFile')//coloca o nome do alias e coloca o @ na frente 

        .should(function ($input) { 

            expect($input[0].files[0].name).to.equal('example.json') 

        })//vai verificar o input 0 (primeiro) e o files 0 (primeiro) e comparar com o nome do arquivo acima 

    }) 

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){ 

        cy.get('#privacy a').should('have.attr', 'target', '_blank')//#privacy é uma div com o ID privacy e com o atributo "a" 

    }) 

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){ 

        cy.get('#privacy a')//#privacy é uma div com o ID privacy e com o atributo "a" 

        .invoke('removeAttr', 'target')//remove o atributo (removeAttr) e indica qual vai remover 'target' e vai fazer com que abra na msm pag 

        .click() 

    }) 

     

}) 

 
