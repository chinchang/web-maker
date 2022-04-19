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
		const sampleText = 'Hello';
		cy.get('#htmlCodeEl').type(sampleText);

		cy.on('window:confirm', text => {
			expect(text).to.contains('Do you still want to continue saving locally?');
		});

		cy.get('#saveBtn').click();
		cy.get('#js-alerts-container').should('be.visible');
		cy.get('#js-alerts-container').contains('Auto-save enabled');

		cy.then(() => {
			const ls = JSON.parse(localStorage.getItem('code'));
			expect(ls).to.be.not.null;
			expect(ls['title']).to.contain('Untitled');
			expect(ls['html']).to.eq(sampleText);
		});
	});

	it('Cmd + S (Save) should save the current work with a notification.', () => {
		const sampleText = 'Hello';

		cy.on('window:confirm', text => {
			expect(text).to.contains('Do you still want to continue saving locally?');
		});

		cy.get('#htmlCodeEl').type(sampleText + '{ctrl+s}');
		cy.get('#js-alerts-container').should('be.visible');
		cy.get('#js-alerts-container').contains('Auto-save enabled');

		cy.then(() => {
			const ls = JSON.parse(localStorage.getItem('code'));
			expect(ls).to.be.not.null;
			expect(ls['title']).to.contain('Untitled');
			expect(ls['html']).to.eq(sampleText);
		});
	});

	it('Changing creation title should auto save in localstorage', () => {
		const sampleText = 'Hello';
		cy.get('#htmlCodeEl').type(sampleText);

		cy.on('window:confirm', text => {
			expect(text).to.contains('Do you still want to continue saving locally?');
		});

		cy.get('#saveBtn').click();

		cy.then(() => {
			const ls = JSON.parse(localStorage.getItem('code'));
			expect(ls).to.be.not.null;
			expect(ls['title']).to.contain('Untitled');
			expect(ls['html']).to.eq(sampleText);
		});

		cy.get('#titleInput').clear().type('test');

		cy.get('#saveBtn').click();
		cy.get('#js-alerts-container').should('be.visible');
		cy.get('#js-alerts-container').contains('Item saved');

		cy.wait(1000); // for the localstorage to reflect the changes

		cy.then(() => {
			const ls = JSON.parse(localStorage.getItem('code'));
			expect(ls).to.be.not.null;
			expect(ls['title']).to.eq('test');
			expect(ls['html']).to.eq(sampleText);
		});
	});

	it('Clicking "OPEN" should open the saved items pane', () => {
		cy.on('window:confirm', text => {
			expect(text).to.contains('Do you still want to continue saving locally?');
			return true;
		});

		const addCreation = message => {
			// start with blank project
			cy.get('[data-testid=newButton').click();
			cy.get('[data-testid=startBlankButton]').click();

			// type a message in the HTML section
			cy.get('#htmlCodeEl').type('{ctrl+a}{backspace}' + message);
			// type the title
			cy.get('#titleInput').clear().type(message).blur();

			// save it
			cy.get('#saveBtn').click();
			cy.wait(1000);
			cy.then(() => {
				const ls = JSON.parse(localStorage.getItem('code'));
				console.log(ls);
				expect(ls).to.be.not.null;
				expect(ls['title']).to.eq(message);
				expect(ls['html']).to.eq(message);
			});
		};

		// save some projects
		const messages = ['test', 'test2', 'abc'];
		messages.forEach(m => addCreation(m));

		// check for the saved projects
		cy.get('#openItemsBtn').click();
		cy.get('#js-saved-items-wrap').should('be.visible');
		messages.forEach((m, index) => {
			cy.get('#js-saved-items-wrap')
				.children()
				.eq(messages.length - index - 1)
				.contains(m);
		});
	});

	it('Selecting a library from dropdown should change URL in textarea', () => {
		cy.get('[data-testid=addLibraryButton]').click();

		cy.get('#externalJsTextarea').should('exist');
		cy.get('#externalCssTextarea').should('exist');

		const checkLibrary = (label, url, type) => {
			cy.get('#js-add-library-select').select(label);

			cy.get(`#external${type}Textarea`).should('contain.value', '\n' + url); // \n because every url should be in a new line
		};

		cy.fixture('libraries').then(data => {
			data['jsLibs'].forEach(lib =>
				checkLibrary(lib['label'], lib['urlPref'], 'Js')
			);
		});

		cy.fixture('libraries').then(data => {
			data['cssLibs'].forEach(lib =>
				checkLibrary(lib['label'], lib['urlPref'], 'Css')
			);
		});
	});
});
