/*
Based on Joel Besada's lovely experiment
https://twitter.com/JoelBesada/status/670343885655293952
 */

;(function () {
	var shakeTime = 0,
		shakeTimeMax = 0,
		shakeIntensity = 5,
		lastTime = 0,
		particles = [],
		particlePointer = 0,
		MAX_PARTICLES = 100,
		PARTICLE_NUM_RANGE = { min: 2, max: 7 },
		PARTICLE_GRAVITY = 0.08,
		PARTICLE_ALPHA_FADEOUT = 0.96,
		PARTICLE_VELOCITY_RANGE = {
			x: [-1, 1],
			y: [-3.5, -1.5]
		},
		w = window.innerWidth,
		h = window.innerHeight,
		effect,
		isActive = false;

	var codemirrors = [], cmNode;
	var canvas, ctx;
	var current_time, dt, magnitude, shakeX, shakeY; // loop vars
	var throttledShake = throttle(shake, 100);
	var throttledSpawnParticles = throttle(spawnParticles, 100);

	function getRGBComponents(node) {
		var color = getComputedStyle(node).color;
		if (color) {
			try {
				return color.match(/(\d+), (\d+), (\d+)/).slice(1);
			} catch(e) {
				return [255, 255, 255];
			}
		} else {
			return [255, 255, 255];
		}
	}

	function spawnParticles(cm, type) {
		var cursorPos = cm.getCursor();
		var pos = cm.cursorCoords();
		var node = document.elementFromPoint(pos.left - 5, pos.top + 5);
		type = cm.getTokenAt(cursorPos);
		if (type) { type = type.type; };
		var numParticles = random(PARTICLE_NUM_RANGE.min, PARTICLE_NUM_RANGE.max);
		var color = getRGBComponents(node);
		for (var i = numParticles; i--;) {
			particles[particlePointer] = createParticle(pos.left + 10, pos.top, color);
			particlePointer = (particlePointer + 1) % MAX_PARTICLES;
		}
	}

	function createParticle(x, y, color) {
		var p = {
			x: x,
			y: y + 10,
			alpha: 1,
			color: color
		};
		if (effect === 1) {
			p.size = random(2, 4);
			p.vx = PARTICLE_VELOCITY_RANGE.x[0] + Math.random() *
					(PARTICLE_VELOCITY_RANGE.x[1] - PARTICLE_VELOCITY_RANGE.x[0]);
			p.vy = PARTICLE_VELOCITY_RANGE.y[0] + Math.random() *
					(PARTICLE_VELOCITY_RANGE.y[1] - PARTICLE_VELOCITY_RANGE.y[0]);
		} else if (effect === 2) {
			p.size = random(2, 8);
			p.drag = 0.92;
			p.vx = random(-3, 3);
			p.vy = random(-3, 3);
			p.wander = 0.15;
			p.theta = random(0, 360) * Math.PI / 180;
		}
		return p;
	}

	function effect1(particle) {
		particle.vy += PARTICLE_GRAVITY;
		particle.x += particle.vx;
		particle.y += particle.vy;

		particle.alpha *= PARTICLE_ALPHA_FADEOUT;

		ctx.fillStyle = 'rgba('+ particle.color[0] +','+ particle.color[1] +','+ particle.color[2] + ',' + particle.alpha + ')';
		ctx.fillRect(Math.round(particle.x - 1), Math.round(particle.y - 1), particle.size, particle.size);
	}

	// Effect based on Soulwire's demo: http://codepen.io/soulwire/pen/foktm
	function effect2(particle) {
		particle.x += particle.vx;
		particle.y += particle.vy;
		particle.vx *= particle.drag;
		particle.vy *= particle.drag;
		particle.theta += random( -0.5, 0.5 );
		particle.vx += Math.sin( particle.theta ) * 0.1;
		particle.vy += Math.cos( particle.theta ) * 0.1;
		particle.size *= 0.96;

		ctx.fillStyle = 'rgba('+ particle.color[0] +','+ particle.color[1] +','+ particle.color[2] + ',' + particle.alpha + ')';
		ctx.beginPath();
		ctx.arc(Math.round(particle.x - 1), Math.round(particle.y - 1), particle.size, 0, 2 * Math.PI);
		ctx.fill();
	}

	function drawParticles(timeDelta) {
		var particle;
		for (var i = particles.length; i--;) {
			particle = particles[i];
			if (!particle || particle.alpha < 0.01 || particle.size <= 0.5) { continue; }

			if (effect === 1) { effect1(particle); }
			else if (effect === 2) { effect2(particle); }
		}
	}

	function shake(editor, time) {
		cmNode = editor.getWrapperElement();
		shakeTime = shakeTimeMax = time;
	}

	function random(min, max) {
		if (!max) { max = min; min = 0; }
		return min + ~~(Math.random() * (max - min + 1))
	}

	function throttle (callback, limit) {
		var wait = false;
		return function () {
			if (!wait) {
				callback.apply(this, arguments);
				wait = true;
				setTimeout(function () {
					wait = false;
				}, limit);
			}
		}
	}

	function loop() {
		if (!isActive) { return; }

		ctx.clearRect(0, 0, w, h);

		// get the time past the previous frame
		current_time = new Date().getTime();
		if(!lastTime) lastTime = current_time;
		dt = (current_time - lastTime) / 1000;
		lastTime = current_time;

		if (shakeTime > 0) {
			shakeTime -= dt;
			magnitude = (shakeTime / shakeTimeMax) * shakeIntensity;
			shakeX = random(-magnitude, magnitude);
			shakeY = random(-magnitude, magnitude);
			cmNode.style.transform = 'translate(' + shakeX + 'px,' + shakeY + 'px)';
		}
		drawParticles();
		requestAnimationFrame(loop);
	}

	function onCodeMirrorChange(editor, change) {
		if (change.origin !== '+input' && change.origin !== '+delete') { return; }

		if (editor.getOption('blastCode') === true || editor.getOption('blastCode').shake === undefined) {
			throttledShake(editor, 0.3);
		}
		throttledSpawnParticles(editor);
	}


	function init(editor) {
		isActive = true;

		if (!canvas) {
			canvas = document.createElement('canvas');
			ctx = canvas.getContext('2d'),

			canvas.id = 'code-blast-canvas'
			canvas.style.position = 'absolute';
			canvas.style.top = 0;
			canvas.style.left = 0;
			canvas.style.zIndex = 1;
			canvas.style.pointerEvents = 'none';
			canvas.width = w;
			canvas.height = h;

			document.body.appendChild(canvas);
			loop();
		}

		editor.on("change", onCodeMirrorChange);
	}

	function destroy(editor) {
		editor.off('change', onCodeMirrorChange);
		codemirrors.splice(codemirrors.indexOf(editor), 1);
		if (!codemirrors.length) {
			isActive = false;
			if (canvas) {
				canvas.remove();
				canvas = null;
			}
		}
	}

	CodeMirror.defineOption('blastCode', false, function(editor, val, old) {
		if (val) {
			codemirrors.push(editor);
			effect = val.effect || 2;
			init(editor);
		} else {
			destroy(editor);
		}

	});
})();
