import { useEffect, useState } from 'preact/hooks';
import { ProBadge } from './ProBadge';
import { HStack, Stack, VStack } from './Stack';
import Switch from './Switch';
import { itemService } from '../itemService';
import { alertsService } from '../notifications';
import { Button } from './common';
import { Icon } from './Icons';
import { Text } from './Text';

const FREE_PUBLIC_ITEM_COUNT = 1;
const BASE_URL = location.origin;
const TOGGLE_VISIBILITY_API =
	/*!window.location.origin.includes('localhost')
	? 'http://127.0.0.1:5001/web-maker-app/us-central1/toggleVisibility'
	: */ 'https://togglevisibility-ajhkrtmkaq-uc.a.run.app';

export function Share({
	user,
	item,
	onVisibilityChange,
	onLoginBtnClick,
	onProBtnClick
}) {
	const [publicItemCount, setPublicItemCount] = useState();
	useEffect(() => {
		if (!user) return;
		window.db.getPublicItemCount(user.uid).then(c => {
			setPublicItemCount(c);
			// console.log('public items', c);
		});
	}, []);

	const [val, setVal] = useState(item.isPublic);
	const onChange = async e => {
		const newVal = e.target.checked;
		setVal(newVal);
		if (newVal) {
			const token = await window.user.getIdToken();
			let res;
			try {
				res = await fetch(
					`${TOGGLE_VISIBILITY_API}?token=${token}&itemId=${item.id}`
				);
			} catch (e) {
				alertsService.add('Could not set visiblity to public');
				setTimeout(() => {
					setVal(!newVal);
				}, 400);
				return;
			}

			if (res.status >= 200 && res.status < 400) {
				setPublicItemCount(publicItemCount + 1);
				onVisibilityChange(true);
				alertsService.add('Visiblity set to public');
			} else {
				alertsService.add('Could not set visiblity to public');
				setTimeout(() => {
					setVal(!newVal);
				}, 400);
			}
		} else {
			itemService.setItem(item.id, { isPublic: false });
			setPublicItemCount(publicItemCount - 1);
			onVisibilityChange(false);
			alertsService.add('Visiblity set to private');
		}
	};

	const copyUrl = () => {
		navigator.clipboard.writeText(`${BASE_URL}/create/${item.id}`);
		alertsService.add('URL copied to clipboard');
	};
	if (!user) {
		return (
			<HStack justify="center" gap={2}>
				<Text>Login to share this creation publicly</Text>
				<Button class="btn btn--primary" onClick={onLoginBtnClick}>
					Login
				</Button>
			</HStack>
		);
	}
	return (
		<VStack gap={4} align="stretch">
			<div style="min-width: 46ch">
				<VStack gap={1} align="stretch">
					<Switch
						checked={val}
						onChange={onChange}
						labels={['Private', 'Public']}
					>
						Access
					</Switch>
					{item.isPublic && (
						<p>
							Public at{' '}
							<a href={`${BASE_URL}/create/${item.id}`} target="_blank">
								{BASE_URL}/create/{item.id}
							</a>{' '}
							<Button
								class="btn btn--dark hint--bottom hint--rounded"
								onClick={copyUrl}
								aria-label="Copy"
							>
								<Icon name="copy" />
							</Button>
						</p>
					)}
				</VStack>
			</div>

			{!user?.isPro ? (
				<VStack gap={1} align="stretch">
					<p>
						Public creations available: {FREE_PUBLIC_ITEM_COUNT}. Used:{' '}
						{publicItemCount === undefined ? '-' : publicItemCount}. Left:{' '}
						{Math.max(0, FREE_PUBLIC_ITEM_COUNT - publicItemCount)}
					</p>
					<p>
						<HStack gap={1}>
							<span>For unlimited public creations, </span>
							<button onClick={onProBtnClick} class="btn btn--pro btn--small">
								Upgrade to Pro
							</button>
						</HStack>
					</p>
				</VStack>
			) : null}
		</VStack>
	);
}
