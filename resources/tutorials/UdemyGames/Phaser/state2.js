var barrel, bullets, velocity = 2000, nextFire = 0, fireRate = 50, enemy, bullet, enemyGroup;
demo.state2 = function(){};
demo.state2.prototype = {
	preload: function(){
		game.load.image('base', 'assets/sprites/canonbase.png');
		game.load.image('barrel', 'assets/sprites/canonbarrel.png');
		game.load.image('bullet', 'assets/sprites/bullet1.png');
		
	},
	create: function(){
		game.stage.backgroundColor = '#7DCEA0';;
		addChangeStateEventListeners();

		var base = game.add.sprite(centerX, centerY, 'base');
		base.anchor.setTo(0.5);
		base.scale.setTo(1);

		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(500, 'bullet');
		bullets.setAll('checkWolrdBounds', true);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('anchor.y', 0.5);
		bullets.setAll('scale.x', 0.85);
		bullets.setAll('scale.y', 0.85);

		barrel = game.add.sprite(centerX, centerY, 'barrel');
		barrel.anchor.setTo(0.2, 0.5);
		barrel.scale.setTo(1.2);

		enemy = game.add.sprite(100, 200, 'goku');
		game.physics.enable(enemy);

		enemyGroup = game.add.group();
		enemyGroup.enableBody = true;
		enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

		for (i = 0; i < 5; i++){
			enemyGroup.create(1200, 250 * i + 50, 'goku');
		}

		enemyGroup.setAll('anchor.x', 0.5);
		enemyGroup.setAll('anchor.y', 0.5);
		enemyGroup.setAll('scale.x', 0.4);
		enemyGroup.setAll('scale.y', 0.4);

	},
	update: function() {
		barrel.rotation = game.physics.arcade.angleToPointer(barrel);
		if (game.input.activePointer.isDown) {
			this.fire();
		}

		game.physics.arcade.overlap(bullets, enemy, this.hitEnemy);
		game.physics.arcade.overlap(enemyGroup, bullets, this.hitGroup);



	},
	fire: function() {
		if (game.time.now > nextFire) {
		nextFire = game.time.now + fireRate;
		console.log('firing');
		bullet = bullets.getFirstDead();
		bullet.reset(barrel.x, barrel.y);

		game.physics.arcade.moveToPointer(bullet, velocity);
		bullet.rotation = game.physics.arcade.angleToPointer(bullet);			
		}
		
	},
	hitEnemy : function() {
		console.log('hit');
		enemy.kill();
		bullet.kill();
	},
	hitGroup : function(e) {
		bullet.kill();
		e.kill();
	}
};