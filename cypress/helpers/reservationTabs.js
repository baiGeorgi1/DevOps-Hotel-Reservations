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


export function verifySearchFunctionality() {
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
}

let selectedRoom = '';

export function verifyOffersTab() {
    cy.get('div.search-result-form-content.custom-form')
        .find('form').should('be.visible')
        .within(() => {
            cy.get('h3')
            .should('contain.text', 'Our Offers');
            cy.get('section.offers').within(() => {
                cy.get('article.offer-card.room-type').should('have.length', 3).each((el) => {
                    cy.wrap(el).should('be.visible');
                });
    
                cy.get('article.offer-card.room-type').then((articles) => {
                    const randomIndex = Math.floor(Math.random() * articles.length);
                    const randomArticle = articles[randomIndex];

                    cy.wrap(randomArticle).find('h4').invoke('text').then((text) => {
                        selectedRoom = text;
                        cy.log(`Selected Room : ${selectedRoom}`)
                    })
                    
                    cy.wrap(randomArticle).click().should('have.class', 'selected-room');
                });
            });
            cy.contains('button', 'Back').should('be.visible').and('be.enabled');
            cy.contains('button', 'Next').should('be.visible').and('be.enabled').click();
        })
    cy.get('div.search-result-form-content.custom-form')
        .find('form').should('not.be.visible')
}

const personalExample = {
    name: 'Name',
    number: 359898555,
    email: 'random@gmail.com'
}
export function verifyPersonalInformationTab() {
    cy.get('div.guest-details-form-content.custom-form')
            .find('form')
            .should('be.visible')
            .within(() => {
                cy.get('h3')
                    .should('contain.text', 'Personal Information')
                cy.get('#name').should('be.visible').type(personalExample.name)
                cy.get('#phone-number').should('be.visible').type(personalExample.number)
                cy.get('#email').should('be.visible').type(personalExample.email)
                cy.contains('button', 'Back').should('be.visible').and('be.enabled')
                cy.contains('button', 'Next').should('be.visible').and('be.enabled').click();
            })
        cy.get('div.guest-details-form-content.custom-form')
            .find('form')
            .should('not.be.visible')
}

export function verifyConfirmReservationTab() {
    cy.get('div.confirm-reservation-content.custom-form')
            .find('form')
            .within(() => {
                cy.get('h3')
                    .should('contain.text', 'Confirm Reservation')
                cy.get('#guest-name').should('be.visible')
                .and('contain.text', `Name: ${personalExample.name}`)
                cy.get('#guest-phone').should('be.visible')
                .and('contain.text', `Phone Number: ${personalExample.number}`)
                cy.get('#guest-email').should('be.visible')
                .and('contain.text', `Email: ${personalExample.email}`)
                cy.get('#guest-room-type').should('be.visible')
                .and('contain.text', `Room Type: ${selectedRoom}`)
                cy.get('#guest-data-in').should('be.visible')
                .and('contain.text', `Date-in: ${convertedStartDate}`)
                cy.get('#guest-data-out').should('be.visible')
                .and('contain.text', `Date-out: ${convertedEndDate}`)
                cy.contains('button', 'Back').should('be.visible').and('be.enabled')
                cy.contains('button', 'Confirm').should('be.visible').and('be.enabled').click();
            })
    cy.get('div.confirm-reservation-content.custom-form')
        .find('form')
        .should('not.be.visible')
}

export function verifyThankYouTab() {
    cy.get('.thank-you')
    .should('be.visible')
    .and('contain.text', 'Thank you for your reservation!')
    .within(() => {
        cy.contains('button', 'Make new reservation').should('be.visible').and('be.enabled')
        .click()
    })

    cy.get('.thank-you')
    .should('not.be.visible')
}