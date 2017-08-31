demo.state3 = function(){};
demo.state3.prototype = {
	preload: function(){
		game.load.image('startButton', '/assets/sprites/startGameButton.png');
		game.load.image('pauseButton', '/assets/sprites/pauseGameButton.png');
		game.load.image('exitButton', '/assets/sprites/exitGameButton.png');
	},
	create: function(){
		game.stage.backgroundColor = '#819FF7';
		
		addChangeStateEventListeners();
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		var b1 = game.add.button(centerX - 100, 300, 'startButton', function(){
			changeState(null, 5);
		});
		var b2 = game.add.button(centerX - 100, 400, 'pauseButton', function(){
			changeState(null, 2);
		});
		var b3 = game.add.button(centerX - 50, 500, 'exitButton');

		b1.onInputDown.add(this.tint, b1);
    	b2.onInputDown.add(this.tint, b2);
   		b3.onInputDown.add(this.tint, b3);

    	b1.onInputUp.add(this.unTint, b1);
    	b2.onInputUp.add(this.unTint, b2);
    	b3.onInputUp.add(this.unTint, b3);

    	this.game.state.restart();
    	
	},
	tint: function() {
		this.tint = 0xbbbbbb;
	},
	unTint: function() {
		this.tint = 0xFFFFFF;
	}
};