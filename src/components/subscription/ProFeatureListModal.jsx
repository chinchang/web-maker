import Modal from '../Modal';
import {UpgradeLink} from "./UpgradeLink";

export function ProFeatureListModal(props) {
	return (
		<Modal show={props.show} closeHandler={props.closeHandler} className={'feature-list'}>
			<section className={'header'}>
				<h1>$1.99/month</h1>
				<h2>Pro</h2>
			</section>
			<section className={'content'}>
				<ul>
					<li>Real-time sequence diagram converter</li>
					<li>Export to PNG</li>
					<li>Hand-tuned themes (coming soon)</li>
					<li>Interact with the diagram (coming soon)</li>
					<li>Advanced DSL syntax (coming soon)</li>
				</ul>
			</section>
			<section className={'call-for-action'}>
				<button>Back</button>
			</section>
			<section className={'notes'}>
				<label>* Subscribe now and stay at this low price for 12 months.</label>
			</section>
		</Modal>
	);
}
