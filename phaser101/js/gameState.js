class GameState extends Phaser.Scene
{
    constructor()
    {
        super({key:"GameState"});
    }

       
    preload()
    {
        this.cameras.main.setBackgroundColor("003");
        this.load.image("backgroundBack", "assets/img/background_back.png");
        this.load.image("backgroundFront", "assets/img/background_frontal.png");
        this.load.image("bullet", "assets/img/spr_bullet_0.png");
        this.load.image("enemyBullet", "assets/img/spr_enemy_bullet_0.png");
        this.load.spritesheet("player", "assets/img/shipAnim.png", {frameWidth: 16, frameHeight: 24});
        this.load.spritesheet("shield", "assets/img/spr_armor.png", {frameWidth: 66, frameHeight: 28});
        this.load.spritesheet("enemy", "assets/img/enemy-medium.png", {frameWidth: 32, frameHeight: 16});
        this.load.spritesheet("explosion", "assets/img/explosion.png", {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("powerUp1", "assets/img/spr_power_up.png", {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("powerUp2", "assets/img/spr_power_up_2.png", {frameWidth: 16, frameHeight: 16});
        this.load.audio("playerShoot", "assets/sounds/snd_shoot.mp3");
        this.load.audio("playerHit", "assets/sounds/snd_ship_hit.wav");
        this.load.audio("pickPowerUp", "assets/sounds/snd_powerup.wav");
        this.load.audio("enemyShoot", "assets/sounds/snd_enemy_laser.wav");
        this.load.audio("enemyHit", "assets/sounds/snd_hit.wav");
        this.load.audio("explode", "assets/sounds/snd_explode.wav");
        
    }

    
    create()
    {
        this.LoadPools();

        this.backgroundBack = this.add.tileSprite(0, 0, config.width, config.height, "backgroundBack").setOrigin(0);
        this.backgroundFront = this.add.tileSprite(0, 0, config.width, config.height, "backgroundFront").setOrigin(0);
        this.shield = this.add.sprite(35, 16, "shield").setFrame(4);
        this.shield.depth = 1;
        this.playerShoot = this.sound.add("playerShoot");
        this.playerHit = this.sound.add("playerHit");
        this.powerUpSound = this.sound.add("pickPowerUp");
        this.enemyShoot = this.sound.add("enemyShoot");
        this.enemyHit = this.sound.add("enemyHit");
        this.explode = this.sound.add("explode");
        this.player = new PlayerPrefab(this, config.width / 2, config.height * .95, "player", this.shield, this.enemyPool, this.playerShoot, this.playerHit, this.explode, this.powerUpSound);  
        this.player.body.collideWorldBounds = true;

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space.on
        (
            "down", 
            function()
            {
                this.player.CreateBullet();
            },
            this
        );        

        this.enemyTimer = this.time.addEvent
        (
            {
                delay: 2000,
                callback: this.CreateEnemies,
                callbackScope: this,
                loop: true
            }
        );

        this.LoadAnimations();     
    }

    LoadPools()
    {
        this.enemyPool = this.physics.add.group();
        this.powerUpPool = this.physics.add.group();
    }

    CreateEnemies()
    {
        var enemy = this.enemyPool.getFirst(false);

        if(!enemy)
        {
            enemy = new EnemyPrefab(this, Phaser.Math.Between(16, config.width - 16), -8, "enemy", this.player, this.enemyShoot, this.enemyHit, this.explode);
            this.enemyPool.add(enemy);
        }
        else
        {
            enemy.body.reset(Phaser.Math.Between(16, config.width - 16), -8);
            enemy.body.enable = true;
            enemy.visible = true;
            enemy.active = true;
        }   

        enemy.body.setVelocityY(gamePrefs.ENEMY_SPEED);
    }

    LoadAnimations()
    {
        this.anims.create(
            {
                key: "idle",
                frames: this.anims.generateFrameNumbers("player", {start:0, end:1}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "goFast",
                frames: this.anims.generateFrameNumbers("player", {start: 0, end: 1}),
                frameRate: 20,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "slowDown",
                frames: this.anims.generateFrameNumbers("player", {start: 0, end: 1}),
                frameRate: 5,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "moveLeft",
                frames: this.anims.generateFrameNumbers("player", {start: 2, end: 3}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "moveRight",
                frames: this.anims.generateFrameNumbers("player", {start: 4, end: 5}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "enemyIdle",
                frames: this.anims.generateFrameNames("enemy", {start: 0, end: 1}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "explosion",
                frames: this.anims.generateFrameNames("explosion", {start: 0, end: 4}),
                frameRate: 10
            }
        )

        this.anims.create(
            {
                key: "powerUp1",
                frames: this.anims.generateFrameNumbers("powerUp1", {start: 0, end: 1}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "powerUp2",
                frames: this.anims.generateFrameNumbers("powerUp2", {start: 0, end: 1}),
                frameRate: 10,
                repeat: -1
            }
        )
    }

    
    update()
    {
        this.backgroundBack .tilePositionY -= .25;
        this.backgroundFront.tilePositionY --;

        this.movementX = 0;
        this.movementY = 0;                  
        
        this.InputMovement();

        if(this.movementX != 0 && this.movementY != 0){
            var velocity = Math.sqrt(Math.pow(this.movementX, 2) + Math.pow(this.movementY, 2));

            this.movementX /= velocity;
            this.movementY /= velocity;            
        }  

        this.player.body.velocity.x += this.movementX;
        this.player.body.velocity.y += this.movementY;      

        this.player.PlayAnimations(this.movementX, this.movementY);

    }

    InputMovement(){

        if(this.cursors.right.isDown)
        {
            this.movementX += gamePrefs.SHIP_SPEED;            
        }
        if(this.cursors.left.isDown)
        {
            this.movementX -= gamePrefs.SHIP_SPEED;            
        }

        if(this.cursors.up.isDown)
        {
            this.movementY -= gamePrefs.SHIP_SPEED;    
        }
        if(this.cursors.down.isDown)
        {
            this.movementY += gamePrefs.SHIP_SPEED;            
        }  

    }

    Restart()
    {
        this.scene.restart();
    }
}