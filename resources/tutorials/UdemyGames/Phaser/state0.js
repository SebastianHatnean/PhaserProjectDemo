var demo = {};
var centerX = 1500 / 2;
var centerY = 1000 / 2;
var goku;
var speed = 10;
var redBall;
var orangeBall;

demo.state0 = function(){};
demo.state0.prototype = {
	preload: function(){
		game.load.image('goku', '/assets/sprites/bestgoku.png');
		game.load.image('background', '/assets/Backgrounds/background2.jpg');
	},
	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#dddddd';
		addChangeStateEventListeners();
		game.world.setBounds(0, 0, 1000, 900);
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		var skybackground = game.add.sprite(0, 0, 'background');
		goku = game.add.sprite(centerX, centerY, 'goku');
		goku.anchor.setTo(0.5, 0.5);
		// MAKE GOKU SMALLER
		goku.scale.setTo(0.5, 0.5);
		game.physics.enable(goku);
		goku.body.collideWorldBounds = true;

		game.camera.follow(goku);
		game.camera.deadzone = new Phaser.Rectangle(centerX - 200, 0, centerY - 500, 200);

	},
	update: function(){
		if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
			goku.x += speed;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
			goku.x -= speed;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
			goku.y -= speed;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
			goku.y += speed;
		}
	}
};


function changeState(i, stateNum){
  console.log('state' + stateNum);
  game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
	game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};

function addChangeStateEventListeners(){
	addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
	addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
	addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
	addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
	addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
	addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
	addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
	addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
	addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
	addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}