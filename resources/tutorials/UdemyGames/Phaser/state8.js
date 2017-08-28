demo.state8 = function(){};
demo.state8.prototype = {
	preload: function(){},
	create: function(){
		game.stage.backgroundColor = '#FF0000';
		addChangeStateEventListeners();
	},
	update: function(){}
};