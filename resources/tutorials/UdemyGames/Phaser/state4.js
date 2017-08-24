demo.state4 = function(){};
demo.state4.prototype = {
	preload: function(){},
	create: function(){
		game.stage.backgroundColor = '#FF0000';
		console.log('state4');
		addChangeStateEventListeners();
	},
	update: function(){}
};