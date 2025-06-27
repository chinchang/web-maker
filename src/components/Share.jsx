import { useEffect, useState } from 'preact/hooks';
import { Skeleton } from './Skeleton';
import { HStack, Stack, VStack } from './Stack';
import Switch from './Switch';
import { itemService } from '../itemService';
import { alertsService } from '../notifications';
import { Button } from './common';
import { Icon } from './Icons';
import { Text } from './Text';
import { LoaderWithText } from './Loader';

const FREE_PUBLIC_ITEM_COUNT = 1;
const BASE_URL = location.origin.includes('chrome-extension://')
	? 'webmaker.app'
	: location.origin;
const TOGGLE_VISIBILITY_API =
	/*!window.location.origin.includes('localhost')
	? 'http://127.0.0.1:5001/web-maker-app/us-central1/toggleVisibility'
	: */ 'https://togglevisibility-ajhkrtmkaq-uc.a.run.app';

// Layout mode definitions with icons
const LAYOUT_MODES = [
	{
		id: 1,
		name: 'Preview on right',
		icon: (
			<svg viewBox="0 0 100 100" style="transform:rotate(-90deg)">
				<use xlinkHref="#mode-icon" />
			</svg>
		)
	},
	{
		id: 2,
		name: 'Preview on bottom',
		icon: (
			<svg viewBox="0 0 100 100">
				<use xlinkHref="#mode-icon" />
			</svg>
		)
	},
	{
		id: 3,
		name: 'Preview on left',
		icon: (
			<svg viewBox="0 0 100 100" style="transform:rotate(90deg)">
				<use xlinkHref="#mode-icon" />
			</svg>
		)
	},
	{
		id: 4,
		name: 'Full screen preview',
		icon: (
			<svg viewBox="0 0 100 100">
				<rect x="0" y="0" width="100" height="100" />
			</svg>
		)
	},
	{
		id: 5,
		name: 'Three-pane horizontal',
		icon: (
			<svg viewBox="0 0 100 100">
				<use xlinkHref="#vertical-mode-icon" />
			</svg>
		)
	}
];

export function Share({
	user,
	item,
	onVisibilityChange,
	onLoginBtnClick,
	onProBtnClick
}) {
	const [publicItemCount, setPublicItemCount] = useState();
	const [selectedLayout, setSelectedLayout] = useState(2); // Default to layout 2

	useEffect(() => {
		if (!user) return;
		window.db.getPublicItemCount(user.uid).then(c => {
			setPublicItemCount(c);
			// console.log('public items', c);
		});
	}, []);

	const [val, setVal] = useState(item.isPublic);
	const [isSyncing, setIsSyncing] = useState(false);
	const onChange = async e => {
		const newVal = e.target.checked;
		setVal(newVal);
		if (newVal) {
			const token = await window.user.firebaseUser.getIdToken();
			let res;
			try {
				setIsSyncing(true);
				res = await fetch(
					`${TOGGLE_VISIBILITY_API}?token=${token}&itemId=${item.id}`
				);
			} catch (e) {
				alertsService.add('Could not set visiblity to public');
				setTimeout(() => {
					setVal(!newVal);
				}, 400);
				return;
			} finally {
				setIsSyncing(false);
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

	const getShareUrl = () => {
		const baseUrl = `${BASE_URL}/create/${item.id}`;
		return selectedLayout ? `${baseUrl}?layout=${selectedLayout}` : baseUrl;
	};

	const copyUrl = () => {
		navigator.clipboard.writeText(getShareUrl());
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
				<VStack gap={2} align="stretch">
					<Switch
						checked={val}
						onChange={onChange}
						labels={['Private', 'Public']}
					>
						Access
					</Switch>
					{isSyncing && (
						<p>
							<LoaderWithText>Syncing...</LoaderWithText>
						</p>
					)}
					{item.isPublic && (
						<VStack gap={2} align="stretch">
							<p>
								Public at{' '}
								<a href={getShareUrl()} target="_blank">
									{getShareUrl()}
								</a>{' '}
								<Button
									class="btn btn--dark hint--bottom hint--rounded"
									onClick={copyUrl}
									aria-label="Copy"
								>
									<Icon name="copy" /> Copy
								</Button>
							</p>

							{/* Layout Mode Selector */}
							<HStack gap={3} align="center">
								<label style="display: block; font-weight: 500;">
									Layout Mode:
								</label>
								<HStack gap={1} align="center">
									{LAYOUT_MODES.map(layout => (
										<label
											key={layout.id}
											style={{
												display: 'flex',
												cursor: 'pointer',
												padding: '8px',
												border:
													selectedLayout === layout.id
														? '2px solid var(--clr-brand-2)'
														: '2px solid transparent',
												borderRadius: '0.5rem',
												transition: 'all 0.2s ease'
											}}
										>
											<input
												type="radio"
												name="layout-mode"
												value={layout.id}
												checked={selectedLayout === layout.id}
												onChange={e =>
													setSelectedLayout(parseInt(e.target.value, 10))
												}
												style={{ display: 'none' }}
											/>
											<div
												style={{
													fill:
														selectedLayout === layout.id
															? 'var(--clr-brand-2)'
															: 'currentColor',
													width: '26px',
													height: '26px',
													display: 'flex'
												}}
											>
												{layout.icon}
											</div>
										</label>
									))}
								</HStack>
							</HStack>
						</VStack>
					)}
				</VStack>
			</div>

			{!user?.isPro ? (
				<VStack gap={1} align="stretch">
					<p>
						<HStack gap={3} justify="flex-start">
							<span>Public creations available: {FREE_PUBLIC_ITEM_COUNT}</span>
							<span>
								Used:{' '}
								{publicItemCount === undefined ? (
									<Skeleton width="2ch" />
								) : (
									publicItemCount
								)}
							</span>
							<span>
								Left:{' '}
								{publicItemCount === undefined ? (
									<Skeleton width="2ch" />
								) : (
									Math.max(0, FREE_PUBLIC_ITEM_COUNT - publicItemCount)
								)}
							</span>
						</HStack>
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
