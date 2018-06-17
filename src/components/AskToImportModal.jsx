import { h } from 'preact';
import Modal from './Modal';

export function AskToImportModal({
	show,
	closeHandler,
	oldSavedCreationsCount,
	dontAskBtnClickHandler,
	importBtnClickHandler
}) {
	return (
		<Modal
			extraClasses="ask-to-import-modal"
			show={show}
			closeHandler={closeHandler}
		>
			<h2>Import your creations in your account</h2>

			<div>
				<p>
					You have <span>{oldSavedCreationsCount}</span> creations saved in your
					local machine. Do you want to import those creations in your account
					so they are more secure and accessible anywhere?
				</p>
				<p>
					It's okay if you don't want to. You can simply logout and access them
					anytime on this browser.
				</p>
				<div class="flex flex-h-end">
					<button onClick={dontAskBtnClickHandler} class="btn">
						Don't ask me again
					</button>
					<button onClick={importBtnClickHandler} class="btn btn--primary ml-1">
						Yes, please import
					</button>
				</div>
			</div>
		</Modal>
	);
}
