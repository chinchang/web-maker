import { h, Component } from 'preact';

export default class Profile extends Component {
	render() {
		return (
			<div class="tac">
				<img
					height="80"
					class="profile-modal__avatar-img"
					src={
						this.props.user
							? this.props.user.photoURL || DEFAULT_PROFILE_IMG
							: ''
					}
					id="profileAvatarImg"
					alt="Profile image"
				/>
				<h3 id="profileUserName" class="mb-2">
					{this.props.user && this.props.user.displayName
						? this.props.user.displayName
						: 'Anonymous Creator'}
				</h3>
				<p>
					<button
						class="btn"
						aria-label="Logout from your account"
						onClick={this.props.logoutBtnHandler}
					>
						Logout
					</button>
				</p>
			</div>
		);
	}
}
