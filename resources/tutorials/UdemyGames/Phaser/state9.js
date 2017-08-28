demo.state9 = function(){};
demo.state9.prototype = {
	preload: function(){},
	create: function(){
		game.stage.backgroundColor = '#FF0000';
		addChangeStateEventListeners();
	},
	update: function(){}
};