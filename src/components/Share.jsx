import { useEffect, useState } from 'preact/hooks';
import { ProBadge } from './ProBadge';
import { HStack, Stack, VStack } from './Stack';
import Switch from './Switch';
import { itemService } from '../itemService';
import { alertsService } from '../notifications';
import { Button } from './common';

const FREE_PUBLIC_ITEM_COUNT = 1;
const BASE_URL = location.origin;

export function Share({ user, item, onVisibilityChange }) {
	const [publicItemCount, setPublicItemCount] = useState(0);
	useEffect(() => {
		if (!user) return;
		window.db.getPublicItemCount(user.uid).then(c => {
			setPublicItemCount(c);
			console.log(c);
		});
	}, []);

	const [val, setVal] = useState(item.isPublic);
	const onChange = async e => {
		const newVal = e.target.checked;
		setVal(newVal);
		if (newVal) {
			const token = await window.user.getIdToken();
			const res = await fetch(
				`http://127.0.0.1:5001/web-maker-app/us-central1/toggleVisibility?token=${token}&itemId=${item.id}`
			);

			if (res.status >= 200 && res.status < 400) {
				setPublicItemCount(publicItemCount + 1);
				onVisibilityChange(true);
				alertsService.add('Visiblity set to public');
			} else {
				alertsService.add('Could not set visiblity to public');
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
	return (
		<VStack gap={4} align="stretch">
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
						<Button class="btn btn--dark" onClick={copyUrl}>
							Copy
						</Button>
					</p>
				)}
			</VStack>

			{!user?.isPro ? (
				<VStack gap={1} align="stretch">
					<p>
						You have {FREE_PUBLIC_ITEM_COUNT - publicItemCount}/
						{FREE_PUBLIC_ITEM_COUNT} public creations left.
					</p>
					<p>
						For unlimited public creations, upgrade to <ProBadge />
					</p>
				</VStack>
			) : null}
		</VStack>
	);
}
