/// <reference types="cypress" />

const consoleAssert = (prompt, expected) => {
	cy.get('#consolePromptEl').type(`${prompt}{enter}`);

	// append the prompt at the beginning of the expected items
	expected.unshift(`"> ${prompt}"`);

	cy.get('ul[data-testid=consoleItems] li').should(
		'have.length',
		expected.length
	);

	expected.forEach((expectedValue, index) => {
		cy.get('ul[data-testid=consoleItems] li').eq(index).contains(expectedValue);
	});
};

describe('Console checks', () => {
	beforeEach(() => {
		cy.init();

		cy.get('a[data-testid=toggleConsole]').click();
	});

	it('Simple arithmetic addition', () => {
		consoleAssert('4+5', ['9']);
	});

	it('Simple arithmetic subtraction', () => {
		consoleAssert('4-5', ['-1']);
	});

	it('Simple arithmetic multiplication', () => {
		consoleAssert('4*5', ['20']);
	});

	it('Simple arithmetic division', () => {
		consoleAssert('4/5', ['0.8']);
	});

	it('Division by Zero', () => {
		consoleAssert('4/0', ['Infinity']);
	});

	it('Console log a message', () => {
		consoleAssert("console.log('hello')", ['hello', 'undefined']);
	});

	it('Equality check', () => {
		consoleAssert("100 == '100'", ['true']);
	});

	it('Strict-Equality check', () => {
		consoleAssert("100 === '100'", ['false']);
	});

	it.only('Minimizing console', () => {
		cy.get('#consoleEl').should('not.have.class', 'is-minimized');
		cy.wait(200); // wait for animation to complete
		cy.get('a[data-testid=toggleConsole]').click();
		cy.get('#consoleEl').should('have.class', 'is-minimized');
	});
});
