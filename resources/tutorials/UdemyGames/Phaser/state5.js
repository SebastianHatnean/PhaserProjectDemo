var accel = 300, platform, smallPlatform, platformGroup, stars, score = 0, scoreText, emitter, volcano, redBall, orangeBall, emitter;

demo.state5 = function(){};
demo.state5.prototype = {
	preload: function(){
		game.load.image('platform', 'assets/sprites/platform.png');
		game.load.image('smallPlatform', 'assets/sprites/smallPlatform.png');
		game.load.image('star', 'assets/sprites/star.png');


		//volcano
		game.load.image('volcano', 'assets/sprites/volcano.png');
		game.load.image('redBall', 'assets/sprites/redBall.png');
		game.load.image('orangeBall', 'assets/sprites/orangeBall.png');
		game.load.image('button1', 'assets/sprites/button1.png');
		game.load.image('button2', 'assets/sprites/button2.png');
	},
	create: function(){
		game.stage.backgroundColor = '#81DAF5';
		addChangeStateEventListeners();
		volcano = game.add.sprite(centerX, 1000, 'volcano');


		goku = game.add.sprite(1400, 650, 'goku');
		platform = game.add.sprite(0, 700, 'platform');

		smallPlatform = game.add.sprite('smallPlatform');

		platformGroup = game.add.group();

		//create the ground
		platformGroup.create(0, 970, 'platform');
		platformGroup.create(400, 970, 'platform');
		platformGroup.create(800, 970, 'platform');
		platformGroup.create(1200, 970, 'platform');


		// flying platforms
		platformGroup.create(0, 150, 'platform');
		platformGroup.create(250, 500, 'platform');
		platformGroup.create(900, 500, 'platform');
		platformGroup.create(1200, 220, 'platform');
		platformGroup.create(700, 300, 'smallPlatform');
		platformGroup.create(830, 150, 'smallPlatform');
		platformGroup.create(1050, 750, 'smallPlatform');
		platformGroup.create(1400, 650, 'smallPlatform');



		game.physics.enable([goku, platform, platformGroup, smallPlatform]);



		// make goku smaller
		goku.scale.setTo(0.6, 0.6);

		//gravity
		goku.body.gravity.y = 1000;
		// make goku bounce when touch the ground
		goku.body.bounce.y = 0.2;
		goku.body.drag.x = 300;
		// collide with the ground
		goku.body.collideWorldBounds = true;
		


		platform.body.immovable = true;


		platformGroup.setAll('body.immovable', true);


		// the stars
		stars = game.add.group();
		stars.enableBody = true;


		// creating 10 stars in our game

		for (var i = 0; i < 22; i++)
		{
			// create a star inside of the stars group 
			var star = stars.create(i * 70, 0, 'star');

			// gravity for the stars
			star.body.gravity.y = 500;

			// random bounce to every star
			star.body.bounce.y = 0.7 + Math.random() * 0.2;
		}

		// the score
		scoreText = game.add.text(15, 15, 'score: 0', { fontSIze : '30px', fill: '#ffffff'});


		//volcano 

		volcano.anchor.setTo(0.5, 1);

		//make volcano smaller
		volcano.scale.setTo(0.5, 0.5);

		emitter = game.add.emitter(centerX, 750, 10);
		emitter.makeParticles(['redBall', 'orangeBall'], 0, 2000, false, true);
		emitter.maxParticleSpeed.set(300, -600);
		emitter.minParticleSpeed.set(-300, -200);
		emitter.gravity = 300;


		game.physics.enable([emitter, goku]);


		var firstButton = game.add.button(1250, 20, 'button1');
		var secondButton = game.add.button(1380, 20, 'button2');
		


		firstButton.onInputDown.add(this.tintStart, firstButton);
		secondButton.onInputDown.add(this.tintStop, secondButton);




		//text under the buttons

		var style = { font: "25px Arial bold", fill: "#990000" };

    	textFireOn = game.add.text(1300, 120, "FIRE ON", style);
    	textFireOff = game.add.text(1435, 120, "FIRE OFF", style);
   		textFireOn.anchor.set(0.5);
   		textFireOff.anchor.set(0.5);


	},
	update: function(){
		//collide goku and the stars with the platformGroup
		var hitPlatform = game.physics.arcade.collide(goku, [platform, platformGroup, smallPlatform]);

		// if goku hit a star, then collect it 
		// collect with the collectStar function

		game.physics.arcade.overlap(goku, stars, collectStar, null, this);


		game.physics.arcade.collide(stars, [platform, platformGroup, smallPlatform]);

		game.physics.arcade.collide(emitter, [platform, platformGroup, smallPlatform]);

		game.physics.arcade.overlap(emitter, goku, killGoku, null, this);

		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			goku.body.acceleration.x = -accel;
/*					goku.scale.setTo(0.6, 0.6);
*/
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			goku.body.acceleration.x = accel;
/*					goku.scale.setTo(-0.6, 0.6);
*/
		} else {
			goku.body.acceleration.x = 0;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			goku.body.velocity.y = -500;
		}
	},
	tintStart: function() {
		game.time.events.add(2000, function(){

			emitter.start(false, 5000, 20);
			game.time.events.loop(5000, function() {
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

			emitter.on = false;
			game.time.events.removeAll();
			// game.time.events.loop(500, function() {
			// 	if (emitter.on) {
			// 		emitter.on = false;
			// 	} else {
			// 		emitter.on = false;
			// 	}
			// });

		});
	}
};

function collectStar(goku, star){
	// collect the stars
	star.kill();

	// add and update the score

	score += 10;
	scoreText.text = 'Score: ' + score;
};

function killGoku(goku, emitter){
	goku.kill();
} 

