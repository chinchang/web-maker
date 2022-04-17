/// <reference types="cypress" />

describe('Testing interfaces', () => {
	beforeEach(() => {
		cy.init();
	});

	it('New button should create a new item if no unsaved changes present', () => {
		cy.get('[data-testid=newButton]').click();

		// since we haven't made any changed it should show the modal
		cy.get('.modal__content').should('be.visible');
	});

	it('New button should ask for confirmation if unsaved changes present, when confirmed modal should pop-up', () => {
		cy.get('#htmlCodeEl').type('Hello');
		cy.get('[data-testid=newButton]').click();

		cy.on('window:confirm', text => {
			expect(text).to.contains('You have unsaved changes.');
		});
		cy.get('.modal__content').should('be.visible');
	});

	it('New button should ask for confirmation if unsaved changes present, when declined modal should not pop-up', () => {
		cy.get('#htmlCodeEl').type('Hello');
		cy.get('[data-testid=newButton]').click();

		cy.on('window:confirm', text => {
			expect(text).to.contains('You have unsaved changes.');
			return false;
		});
		cy.get('.modal__content').should('not.exist');
	});

	it('Save button click should save the current work with a notification.', () => {
		cy.get('#htmlCodeEl').type('Hello');

		cy.on('window:confirm', text => {
			expect(text).to.contains('Do you still want to continue saving locally?');
		});

		cy.get('#saveBtn').click();

		cy.then(() => {
			const ls = JSON.parse(localStorage.getItem('code'));
			expect(ls).to.be.not.null;
			expect(ls['title']).to.contain('Untitled');
		});
	});
});
