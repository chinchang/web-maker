import { h } from 'preact';
import { Trans } from '@lingui/macro';
import Modal from './Modal';

export function SupportDeveloperModal({ show, closeHandler }) {
	return (
		<Modal extraClasses="pledge-modal" show={show} closeHandler={closeHandler}>
			<div class="tac">
				<h1>
					<Trans>Support the Developer</Trans>
				</h1>
				<p>
					<Trans>
						Hi,{' '}
						<a
							href="https://kushagragour.in"
							target="_blank"
							rel="noopener noreferrer"
						>
							Kushagra
						</a>{' '}
						here! Web Maker is a free and open-source project. To keep myself
						motivated for working on such open-source and free{' '}
						<a
							href="https://kushagragour.in/lab/"
							target="_blank"
							rel="noopener noreferrer"
						>
							side projects
						</a>
						, I am accepting donations. Your pledge, no matter how small, will
						act as an appreciation towards my work and keep me going forward
						making Web Maker more awesome🔥. So please consider donating. 🙏🏼
						(could be as small as $1/month).
					</Trans>
				</p>

				<div
					class="flex flex-h-center"
					id="onboardDontShowInTabOptionBtn"
					d-click="onDontShowInTabClicked"
				>
					<a
						class="onboard-selection"
						href="https://patreon.com/kushagra"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Make a monthly pledge on Patreon"
					>
						<img
							src="assets/patreon.png"
							height="60"
							alt="Become a patron image"
						/>
						<h3 class="onboard-selection-text">
							<Trans>Make a monthly pledge on Patreon</Trans>
						</h3>
					</a>
				</div>

				<a
					href="https://www.paypal.me/kushagragour"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Make a one time donation on Paypal"
				>
					<Trans>Or, make a one time donation</Trans>
				</a>
			</div>
		</Modal>
	);
}
