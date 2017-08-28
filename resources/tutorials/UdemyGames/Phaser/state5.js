var accel = 400, platform, platformGroup, stars, score = 0, scoreText;

demo.state5 = function(){};
demo.state5.prototype = {
	preload: function(){
		game.load.image('platform', 'assets/sprites/platform.png');
		game.load.image('star', 'assets/sprites/star.png');
	},
	create: function(){
		game.stage.backgroundColor = '#81DAF5';
		addChangeStateEventListeners();

		goku = game.add.sprite(centerX, 500, 'goku');
		platform = game.add.sprite(0, 800, 'platform');

		platformGroup = game.add.group();

		//create the ground
		platformGroup.create(0, 970, 'platform');
		platformGroup.create(400, 970, 'platform');
		platformGroup.create(800, 970, 'platform');
		platformGroup.create(1200, 970, 'platform');


		// flying platforms
		platformGroup.create(650, 500, 'platform');
		platformGroup.create(1200, 220, 'platform');

		/*star = game.add.sprite(500, 0, 'star');*/


		game.physics.enable([goku, platform, platformGroup]);


		// make goku smaller
		goku.scale.setTo(0.7, 0.7);

		//gravity
		goku.body.gravity.y = 900;
		// make goku bounce when touch the ground
		goku.body.bounce.y = 0.3;
		goku.body.drag.x = 500;
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


	},
	update: function(){
		//collide goku and the stars with the platformGroup
		var hitPlatform = game.physics.arcade.collide(goku, [platform,platformGroup]);

		// if goku hit a star, then collect it 
		// collect with the collectStar function

		game.physics.arcade.overlap(goku, stars, collectStar, null, this);


		game.physics.arcade.collide(stars, [platform, platformGroup]);
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			goku.body.acceleration.x = -accel;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			goku.body.acceleration.x = accel;
		} else {
			goku.body.acceleration.x = 0;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			goku.body.velocity.y = -500;
		}
	}
};

function collectStar(goku, star){
	// collect the stars
	star.kill();

	// add and update the score

	score += 10;
	scoreText.text = 'Score: ' + score;
} 

