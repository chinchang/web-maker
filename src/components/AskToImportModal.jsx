import { h } from 'preact';
import { Trans } from '@lingui/macro';
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
			<h2>
				<Trans>Import your creations in your account</Trans>
			</h2>

			<div>
				<p>
					<Trans>
						You have <span>{oldSavedCreationsCount}</span> creations saved in
						your local machine. Do you want to import those creations in your
						account so they are more secure and accessible anywhere?
					</Trans>
				</p>
				<p>
					<Trans>
						It's okay if you don't want to. You can simply logout and access
						them anytime on this browser.
					</Trans>
				</p>
				<div class="flex flex-h-end">
					<button onClick={dontAskBtnClickHandler} class="btn">
						<Trans>Don't ask me again</Trans>
					</button>
					<button onClick={importBtnClickHandler} class="btn btn--primary ml-1">
						<Trans>Yes, please import</Trans>
					</button>
				</div>
			</div>
		</Modal>
	);
}
