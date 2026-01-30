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

export const FeedbackBoard = ({ isOpen, onClose, user }) => {
	const [feedbackList, setFeedbackList] = useState([]);
	const [newFeedback, setNewFeedback] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		const q = query(
			collection(db, 'feedback'),
			orderBy('upvotes', 'desc'),
			orderBy('createdAt', 'desc')
		);
		const unsubscribe = onSnapshot(q, snapshot => {
			const feedbacks = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setFeedbackList(feedbacks);
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
		<Modal show={isOpen} closeHandler={onClose} extraClasses="feedback-modal">
			<div class="feedback-board">
				<h2 class="feedback-board__title">Feedback & Suggestions</h2>
				<p class="feedback-board__subtitle">
					Vote for features you want to see or suggest new ones.
				</p>

				<form onSubmit={handleSubmit} class="feedback-board__form">
					<input
						type="text"
						class="input feedback-board__input"
						placeholder="I wish Web Maker could..."
						value={newFeedback}
						onInput={e => setNewFeedback(e.target.value)}
						disabled={isSubmitting}
					/>
					<Button
						class="btn btn--dark"
						type="submit"
						disabled={isSubmitting || !newFeedback.trim()}
					>
						{isSubmitting ? 'Sending...' : 'Send'}
					</Button>
				</form>

				<div class="feedback-list">
					{feedbackList.length === 0 && (
						<div class="feedback-board__empty">
							No feedback yet. Be the first!
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
								<div class="feedback-item__vote-icon">➤</div>
								<div class="feedback-item__vote-count">{item.upvotes || 0}</div>
							</button>
							<div class="feedback-item__text">
								<div>{item.text}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</Modal>
	);
};
