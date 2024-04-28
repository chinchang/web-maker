import { h, Component } from 'preact';
import { trackEvent } from '../analytics';
import { auth } from '../auth';

export default class Login extends Component {
	login(e) {
		const provider = e.target.dataset.authProvider;
		trackEvent('ui', 'loginProviderClick', provider);
		auth.login(provider);
	}
	componentDidMount() {
		window.db.local.get(
			{
				lastAuthProvider: ''
			},
			result => {
				if (result.lastAuthProvider) {
					document.body.classList.add(`last-login-${result.lastAuthProvider}`);
				}
			}
		);
	}
	render() {
		return (
			<div>
				<h2>Login / Signup</h2>

				<div>
					<p>
						<button
							type="button"
							onClick={this.login.bind(this)}
							class="social-login-btn social-login-btn--github  btn btn-icon btn--big full-width hint--right hint--always"
							data-auth-provider="github"
							data-hint="You logged in with Github last time"
						>
							<svg>
								<use xlinkHref="#github-icon" />
							</svg>
							Login with Github
						</button>
					</p>
					<p>
						<button
							type="button"
							onClick={this.login.bind(this)}
							class="social-login-btn social-login-btn--google  btn btn-icon btn--big full-width hint--right hint--always"
							data-auth-provider="google"
							data-hint="You logged in with Google last time"
						>
							<svg>
								<use xlinkHref="#google-icon" />
							</svg>
							Login with Google
						</button>
					</p>

					<p>Join a community of 70,000+ Developers</p>
				</div>
			</div>
		);
	}
}
