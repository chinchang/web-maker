import Modal from './Modal.jsx';

export function OnboardingModal(props) {
	return (
		<Modal show={props.show} closeHandler={props.closeHandler}>
			<div class="tac">
				<h1 style="margin-top:20px">Welcome to ZenUML - Web Sequence</h1>
			</div>
			<div class="onboard-step">
				<img src="./animation/open-up-stage.gif" alt="ZenUML animation" />
			</div>
		</Modal>
	);
}
