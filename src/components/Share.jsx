import { useEffect, useState } from 'preact/hooks';
import { ProBadge } from './ProBadge';
import { HStack, Stack, VStack } from './Stack';
import Switch from './Switch';
import { itemService } from '../itemService';
import { alertsService } from '../notifications';

const FREE_PUBLIC_ITEM_COUNT = 1;

export function Share({ user, item, onVisibilityChange }) {
	const [publicItemCount, setPublicItemCount] = useState(0);
	useEffect(() => {
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
			console.log(res.status);

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
	return (
		<VStack gap={4} align="stretch">
			<VStack gap={1} align="stretch">
				<Switch checked={val} onChange={onChange}>
					Go public?
				</Switch>
				{item.isPublic && (
					<p>
						Public at{' '}
						<a href={`https://webmaker.app/create/${item.id}`} target="_blank">
							https://webmaker.app/create/{item.id}
						</a>
					</p>
				)}
			</VStack>

			<VStack gap={1} align="stretch">
				<p>
					You have {FREE_PUBLIC_ITEM_COUNT - publicItemCount}/
					{FREE_PUBLIC_ITEM_COUNT} public creations left.
				</p>
				<p>
					For unlimited public creations, upgrade to <ProBadge />
				</p>
			</VStack>
		</VStack>
	);
}
