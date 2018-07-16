import { h } from 'preact';
import Modal from './Modal';

export function SupportDeveloperModal({ show, closeHandler }) {
	return (
		<Modal extraClasses="pledge-modal" show={show} closeHandler={closeHandler}>
			<div class="tac">
				<h1>Welcome!</h1>
				<div class="flex" style="margin-top: 100px;">
					<div class="onboard-step">
						<img src="./animation/10s.gif" alt="Middleman logo" />
					</div>
				</div>
			</div>
		</Modal>
	);
}
