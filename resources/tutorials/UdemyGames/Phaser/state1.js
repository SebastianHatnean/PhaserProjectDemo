demo.state1 = function(){};
demo.state1.prototype = {
	preload: function(){},
	create: function(){
		game.stage.backgroundColor = '#000000';
		addChangeStateEventListeners();
	},
	update: function(){}
};