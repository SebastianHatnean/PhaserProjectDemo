var emitter;
demo.state6 = function(){};
demo.state6.prototype = {
	preload: function(){

		game.load.image('volcano', 'assets/sprites/volcano.png');
		game.load.image('redBall', 'assets/sprites/redBall.png');
		game.load.image('orangeBall', 'assets/sprites/orangeBall.png');
		game.load.image('button1', 'assets/sprites/button1.png');
		game.load.image('button2', 'assets/sprites/button2.png');

	},
	create: function(){
		game.stage.backgroundColor = '#F7BE81';;
		addChangeStateEventListeners();

		game.add.sprite(centerX, 1000, 'volcano').anchor.setTo(0.5, 1);

		emitter = game.add.emitter(centerX, 500, 2000);
		emitter.makeParticles(['redBall', 'orangeBall'], 0, 5000, false, true);
		emitter.maxParticleSpeed.set(300, -300);
		emitter.minParticleSpeed.set(-300, -100);
		emitter.gravity = 300;


		var firstButton = game.add.button(500, 100, 'button1');
		var secondButton = game.add.button(650, 100, 'button2');
		


		firstButton.onInputDown.add(this.tintStart, firstButton);
		secondButton.onInputDown.add(this.tintStop, secondButton);

	},
	update: function(){},
	tintStart: function() {
		game.time.events.add(2000, function(){

			emitter.start(false, 5000, 20);
			game.time.events.loop(500, function() {
				if (emitter.on) {
					emitter.on = false;
				} else {
					emitter.on = true;
				}
			});

		});
	},
	tintStop: function() {
		game.time.events.add(0, function(){

			emitter.start(true, 0, 0);
			game.time.events.loop(500, function() {
				if (emitter.on) {
					emitter.on = true;
				} else {
					emitter.on = false;
				}
			});

		});
	}
};