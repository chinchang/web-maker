import { h } from 'preact';

const DEFAULT_PROFILE_IMG =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ccc' d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z'/%3E%3C/svg%3E";

export function Profile({ user, logoutBtnHandler }) {
	return (
		<div class="tac">
			<img
				height="80"
				class="profile-modal__avatar-img"
				src={user ? user.photoURL || DEFAULT_PROFILE_IMG : ''}
				id="profileAvatarImg"
				alt="Profile image"
			/>
			<h3 id="profileUserName" class="mb-2">
				{user && user.displayName ? user.displayName : 'Anonymous Creator'}
			</h3>
			<p>
				<button
					class="btn"
					aria-label="Logout from your account"
					onClick={logoutBtnHandler}
				>
					Logout
				</button>
			</p>
		</div>
	);
}
