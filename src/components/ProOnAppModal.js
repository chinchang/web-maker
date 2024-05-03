import { h } from 'preact';
import Modal from './Modal';
import { Text } from './Text';
import { Stack } from './Stack';

export function ProOnAppModal({ show, closeHandler }) {
	return (
		<Modal extraClasses="" show={show} closeHandler={closeHandler}>
			<div class="ta">
				<Text appearance="primary" tag="h1" size="4" weight="700">
					Upgrade on Web app
				</Text>
				<p className="para">
					Upgrading to PRO from the extension is not available yet. You can
					instead upgrade on the Web app, come back here, refresh and get all
					the PRO features right here!
				</p>

				<Stack justify="center">
					<a href="https://webmaker.app/create" className="btn btn--pro">
						Upgrade on Web app
					</a>
				</Stack>
			</div>
		</Modal>
	);
}
