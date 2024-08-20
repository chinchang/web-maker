import { h } from 'preact';
import Modal from './Modal';

export function Js13KModal({ show, closeHandler }) {
	return (
		<Modal show={show} closeHandler={closeHandler} small>
			<div class="tac">
				<div className="flex flex-v-center flex-h-center ">
					<img
						src="/icon-128.png"
						alt="Web Maker logo"
						height="100"
						style="margin:0 0.5rem;"
					/>
					<h2>Web Maker</h2>
					<span style="font-size:3rem;margin:0 1rem;">+</span>
					<h2>JS13K Games</h2>
					<img
						src="assets/js13kgames-square-logo.png"
						alt="JS13K Games logo"
						height="100"
						style="margin:0 0.5rem;"
					/>
				</div>
			</div>
			<div>
				<p>
					<strong>Js13kGames</strong> is a JavaScript coding competition for{' '}
					<strong>HTML5 Game Developers</strong>. The fun part of the compo is
					the file size limit set to <strong>13 kilobytes</strong>. The
					competition will start at <strong>13:00 CEST, 13th August</strong> and
					will end at <strong>13:00 CEST, 13th September</strong>.
				</p>

				<p>
					You have activated Web Maker's Js13kGames mode! This gives you some
					extra support to build your awesome game right here. Constantly see
					your game's zipped size in the footer. When you are done, download the
					zip.{' '}
					<a
						href="https://medium.com/web-maker/js13kgames-jam-with-web-maker-a3389cf2cbb"
						target="_blank"
						rel="noopener"
					>
						Read more about this collaboration
					</a>
					.
				</p>

				<ul>
					<li>
						<a
							href="https://gamedevelopment.tutsplus.com/articles/how-to-minify-your-html5-game-for-the-js13kgames-competition--cms-21883"
							target="_blank"
							rel="noopener noreferrer"
						>
							Read Tuts+ Gamedev intro article
						</a>
					</li>
					<li>
						<a
							href="http://js13kgames.github.io/resources/"
							target="_blank"
							rel="noopener"
						>
							Resources and useful tools
						</a>
					</li>
					<li>
						<a
							href="http://2018.js13kgames.com/#rules"
							target="_blank"
							rel="noopener"
						>
							Compo rules
						</a>
					</li>
				</ul>
				<p>Have fun building games!</p>
			</div>
		</Modal>
	);
}
