import { h } from 'preact';
import Modal from './Modal';
import { Button } from './common';

export function HelpModal(props) {
	return (
		<Modal show={props.show} closeHandler={props.closeHandler}>
			<h1>
				<div class="web-maker-with-tag">Web Sequence (from ZenUML)</div>
				<small style="font-size:14px;"> v2.0.0</small>
				<div class="flex">
					<div class="onboard-step">
						<img src="./animation/10s.gif" alt="Middleman logo"/>
					</div>
				</div>
				<p>
					Get more help from <a href="https://www.zenuml.com/help.html">ZenUML.com</a>
				</p>

			</h1>

		</Modal>
	);
}
