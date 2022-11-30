/// <reference types="cypress" />

describe('Pressing the layout buttons should change the layouts accordingly', () => {
	before(() => {
		cy.init();
		cy.viewport(1270, 720);
	});

	const getLayoutBtnId = index => `#layoutBtn${index}`;

	it('Default Layout', () => {
		cy.get('body').should('have.class', 'layout-1');

		cy.get('#js-code-side').should('be.visible');
		cy.get('#js-demo-side').should('be.visible');

		cy.get('#js-code-side').should(
			'have.attr',
			'style',
			'width: calc(50% - 3px);'
		);
		cy.get('#js-code-side').should('have.attr', 'direction', 'vertical');

		cy.get('#js-demo-side').should(
			'have.attr',
			'style',
			'width: calc(50% - 3px);'
		);
	});

	it('Layout 2', () => {
		cy.get(getLayoutBtnId(2)).click();

		cy.get('body').should('have.class', 'layout-2');

		cy.get('#js-code-side').should('be.visible');
		cy.get('#js-demo-side').should('be.visible');

		cy.get('#js-code-side').should(
			'have.attr',
			'style',
			'height: calc(50% - 3px);'
		);
		cy.get('#js-code-side').should('have.attr', 'direction', 'horizontal');

		cy.get('#js-demo-side').should(
			'have.attr',
			'style',
			'height: calc(50% - 3px);'
		);
	});

	it('Layout 3', () => {
		cy.get(getLayoutBtnId(3)).click();

		cy.get('body').should('have.class', 'layout-3');

		cy.get('#js-code-side').should('be.visible');
		cy.get('#js-demo-side').should('be.visible');

		cy.get('#js-code-side').should(
			'have.attr',
			'style',
			'width: calc(50% - 3px);'
		);
		cy.get('#js-code-side').should('have.attr', 'direction', 'vertical');

		cy.get('#js-demo-side').should(
			'have.attr',
			'style',
			'width: calc(50% - 3px);'
		);
	});

	it('Layout 4', () => {
		cy.get(getLayoutBtnId(4)).click();

		cy.get('body').should('have.class', 'layout-4');

		cy.get('#js-code-side').should('not.be.visible');
		cy.get('#js-demo-side').should('be.visible');
	});

	it('Layout 5', () => {
		cy.get(getLayoutBtnId(5)).click();

		cy.get('body').should('have.class', 'layout-5');

		cy.get('#js-code-side').should('be.visible');
		cy.get('#js-demo-side').should('be.visible');

		cy.get('#js-code-side').should('have.attr', 'direction', 'horizontal');
	});
});
