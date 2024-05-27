/// <reference types="cypress" />

const { verifySearchFunctionality, verifyOffersTab, verifyPersonalInformationTab, verifyConfirmReservationTab, verifyThankYouTab } = require("../helpers/reservationTabs.js");


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

    it('Verify Search functionality', () => {
        verifySearchFunctionality();
    })

    it('Verify Our Offers Tab', () => {
        verifySearchFunctionality();
        verifyOffersTab();
    })

    it('Verify Personal Information Tab', () => {
        verifySearchFunctionality();
        verifyOffersTab();
        verifyPersonalInformationTab();
    })

    it('Verify Confirm Reservation tab', () => {
        verifySearchFunctionality();
        verifyOffersTab();
        verifyPersonalInformationTab();
        verifyConfirmReservationTab();
    })

    it('Verify Thank you page', () => {
        verifySearchFunctionality();
        verifyOffersTab();
        verifyPersonalInformationTab();
        verifyConfirmReservationTab();
        verifyThankYouTab();
    })
})