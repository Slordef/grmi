/// <reference types="cypress" />

const createWebhookBody = () => ({
    action: 'queued',
    workflow_job: {
        id: 123,
        name: 'test'
    },
    repository: {
        id: 123,
        name: 'test',
        private: true,
        full_name: 'test/test',
    }
});

context('Endpoints', () => {
    const port = Cypress.env('PORT');
    it('should get response', () => {
        cy.request('GET', `http://localhost:${port}/`).then((response) => {
            expect(response.body).contains('App is running');
        });
    });
    it('should return webhook queue response', () => {
        const body = createWebhookBody();
        cy.request('POST', `http://localhost:${port}/webhook`, body).then((response) => {
            expect(response.body).contains('OK');
        });
    });
    it('should return webhook queue response', () => {
        const body = createWebhookBody();
        body.action = 'completed';
        
        cy.request('POST', `http://localhost:${port}/webhook`, body).then((response) => {
            expect(response.body).contains('OK');
        });
    });
});