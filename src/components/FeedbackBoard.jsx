import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Modal from './Modal';
import { db, auth } from '../firebaseInit';
import {
	collection,
	addDoc,
	query,
	orderBy,
	onSnapshot,
	updateDoc,
	doc,
	arrayUnion,
	arrayRemove,
	serverTimestamp
} from 'firebase/firestore';
import { Button } from './common';
import { Trans, t } from '@lingui/macro';
import { I18n } from '@lingui/react';

export const FeedbackBoard = ({ isOpen, onClose, user }) => {
	const [feedbackList, setFeedbackList] = useState([]);
	const [newFeedback, setNewFeedback] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		let isInitialLoad = true;

		const q = query(
			collection(db, 'feedback'),
			orderBy('upvotes', 'desc'),
			orderBy('createdAt', 'desc')
		);
		const unsubscribe = onSnapshot(q, snapshot => {
			const newDocs = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));

			if (isInitialLoad) {
				setFeedbackList(newDocs);
				isInitialLoad = false;
			} else {
				setFeedbackList(prevList => {
					const newDocsMap = new Map(newDocs.map(d => [d.id, d]));
					const prevIds = new Set(prevList.map(d => d.id));

					const updatedList = prevList
						.filter(item => newDocsMap.has(item.id))
						.map(item => newDocsMap.get(item.id));

					const newItems = newDocs.filter(d => !prevIds.has(d.id));
					return [...updatedList, ...newItems];
				});
			}
		});

		return () => unsubscribe();
	}, [isOpen]);

	const handleSubmit = async e => {
		e.preventDefault();
		if (!newFeedback.trim()) return;

		setIsSubmitting(true);
		try {
			await addDoc(collection(db, 'feedback'), {
				text: newFeedback,
				upvotes: 0,
				upvotedBy: [],
				createdAt: serverTimestamp(),
				userId: user?.uid || 'anonymous',
				userName: user?.displayName || 'Anonymous'
			});
			setNewFeedback('');
		} catch (error) {
			console.error('Error adding feedback: ', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpvote = async feedback => {
		if (!user) {
			alert('Please login to vote!');
			return;
		}
		const feedbackRef = doc(db, 'feedback', feedback.id);
		const hasUpvoted = feedback.upvotedBy?.includes(user.uid);

		try {
			if (hasUpvoted) {
				await updateDoc(feedbackRef, {
					upvotes: feedback.upvotes - 1,
					upvotedBy: arrayRemove(user.uid)
				});
			} else {
				await updateDoc(feedbackRef, {
					upvotes: feedback.upvotes + 1,
					upvotedBy: arrayUnion(user.uid)
				});
			}
		} catch (error) {
			console.error('Error updating upvote: ', error);
		}
	};

	return (
		<I18n>
			{({ i18n }) => (
				<Modal
					show={isOpen}
					closeHandler={onClose}
					extraClasses="feedback-modal"
				>
					<div class="feedback-board">
						<h1 class="feedback-board__title">
							<Trans>Feedback & Suggestions</Trans>
						</h1>
						<p class="feedback-board__subtitle">
							<Trans>
								Vote for features you want to see or suggest new ones.
							</Trans>
						</p>

						<form onSubmit={handleSubmit} class="feedback-board__form">
							<input
								type="text"
								class="input feedback-board__input"
								placeholder={i18n._(t`I wish Web Maker could...`)}
								value={newFeedback}
								onInput={e => setNewFeedback(e.target.value)}
								disabled={isSubmitting}
							/>
							<Button
								class="btn btn--dark"
								type="submit"
								disabled={isSubmitting || !newFeedback.trim()}
							>
								{isSubmitting ? (
									<Trans>Submitting...</Trans>
								) : (
									<Trans>Submit</Trans>
								)}
							</Button>
						</form>

						<div class="feedback-list">
							{feedbackList.length === 0 && (
								<div class="feedback-board__empty">
									<Trans>No feedback yet. Be the first!</Trans>
								</div>
							)}
							{feedbackList.map(item => (
								<div key={item.id} class="feedback-item">
									<button
										class={`feedback-item__vote-btn ${
											item.upvotedBy?.includes(user?.uid)
												? 'feedback-item__vote-btn--active'
												: ''
										}`}
										onClick={() => handleUpvote(item)}
									>
										<div class="feedback-item__vote-icon">
											<svg
												viewBox="0 0 24 24"
												width="18"
												height="18"
												fill="currentColor"
											>
												<path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
											</svg>
										</div>
										<div class="feedback-item__vote-count">
											{item.upvotes || 0}
										</div>
									</button>
									<div class="feedback-item__text">
										<div>{item.text}</div>
										<div class="feedback-item__date">
											<Trans>Submitted on:</Trans>{' '}
											{item.createdAt?.seconds
												? new Date(
														item.createdAt.seconds * 1000
													).toLocaleDateString('en-GB', {
														day: 'numeric',
														month: 'short',
														year: 'numeric'
													})
												: ''}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</Modal>
			)}
		</I18n>
	);
};
