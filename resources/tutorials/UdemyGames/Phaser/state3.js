demo.state3 = function(){};
demo.state3.prototype = {
	preload: function(){
		game.load.image('button1', '/assets/sprites/button1.png');
		game.load.image('button2', '/assets/sprites/button2.png');
		game.load.image('button3', '/assets/sprites/button3.png');
	},
	create: function(){
		game.stage.backgroundColor = '#819FF7';
		addChangeStateEventListeners();

		var b1 = game.add.button(100, 100, 'button1', function(){
			changeState(null, 1);
		});
		var b2 = game.add.button(200, 200, 'button2', function(){
			changeState(null, 2);
		});
		var b3 = game.add.button(300, 300, 'button3');

		b1.onInputDown.add(this.tint, b1);
    	b2.onInputDown.add(this.tint, b2);
   		b3.onInputDown.add(this.tint, b3);

    	b1.onInputUp.add(this.unTint, b1);
    	b2.onInputUp.add(this.unTint, b2);
    	b3.onInputUp.add(this.unTint, b3);
	},
	tint: function() {
		this.tint = 0xbbbbbb;
	},
	unTint: function() {
		this.tint = 0xFFFFFF;
	}
};