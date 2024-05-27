/// <reference types="cypress" />

const exampleReservation = {
    startDate: '05/29/2024',
    endDate: '05/31/2024',
    people: 5
}

const convertDate = (date) => {
    const [month, day, year] = date.split('/');
    return `${year}-${month}-${day}`;
};

const convertedStartDate = convertDate(exampleReservation.startDate);
const convertedEndDate = convertDate(exampleReservation.endDate);

describe('Hotel reservations E2E tests', () => {
    beforeEach('Open app', () => {
        cy.visit('index.html');
    })

    it('Verify url', () => {
        cy.url().should('contain', 'index.html')
    })

    it('Verify header', () => {
        cy.get('#welcome')
            .find('h1')
            .should('contain.text', 'Welcome to our family hotel')
        cy.get('div.info')
            .find('h1')
            .should('contain.text', 'Hotel reservation')
    })

    it('Verify Search tab', () => {
        cy.get('div.search-form-content.custom-form')
            .find('form')
            .within(() => {
                cy.get('h3')
                    .should('contain.text', 'Search Here')
                cy.get('#check-in').should('be.visible')
                cy.get('#check-out').should('be.visible')
                cy.get('#people').should('be.visible')
                cy.contains('button', 'Next').should('be.visible').and('be.enabled')
            })
    })

    it('Verify Reservation functionality', () => {
        cy.get('div.search-form-content.custom-form')
            .find('form')
            .within(() => {
                cy.get('#check-in').should('be.visible')
                    .invoke('val', convertedStartDate).trigger('change')
                    .should('have.value', convertedStartDate);

                cy.get('#check-out').should('be.visible')
                    .invoke('val', convertedEndDate).trigger('change')
                    .should('have.value', convertedEndDate);

                cy.get('#people').should('be.visible')
                    .type(exampleReservation.people)
                    .should('have.value', exampleReservation.people);

                cy.contains('button', 'Next')
                .should('be.visible')
                .and('be.enabled')
                .click();
            });
        cy.get('div.search-form-content.custom-form')
            .find('form')
            .should('not.be.visible')

        cy.get('div.search-result-form-content.custom-form')
        .find('form').should('be.visible')
        .within(() => {
            cy.get('h3')
            .should('contain.text', 'Our Offers');
        })
    })
})