class GameState extends Phaser.Scene
{
    constructor()
    {
        super({key:"GameState"});
    }

    //Carga assets en memoria        
    preload()
    {
        this.cameras.main.setBackgroundColor("003");
        this.load.image("backgroundBack", "assets/img/background_back.png");
        this.load.image("backgroundFront", "assets/img/background_frontal.png");
        this.load.spritesheet("ship", "assets/img/shipAnim.png", {frameWidth: 16, frameHeight: 24});
        this.load.image("bullet", "assets/img/spr_bullet_0.png");
        this.load.spritesheet("enemy", "assets/img/enemy-medium.png", {frameWidth: 32, frameHeight: 16});
    }

    //Pinta assets en pantalla
    create()
    {
        this.backgroundBack = this.add.tileSprite(0, 0, config.width, config.height, "backgroundBack").setOrigin(0);
        this.backgroundFront = this.add.tileSprite(0, 0, config.width, config.height, "backgroundFront").setOrigin(0);
        this.ship = this.physics.add.sprite(config.width / 2, config.height * .95, "ship");        
        this.ship.body.collideWorldBounds = true;

        this.LoadPools();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.space.on
        (
            "down", 
            function()
            {
                this.CreateBullet();
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
        this.bulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group();
    }

    CreateEnemies()
    {
        var enemy = this.enemyPool.getFirst(false);

        if(!enemy)
        {
            enemy = new EnemyPrefab(this, Phaser.Math.Between(16, config.width - 16), -8, "enemy");
            this.enemyPool.add(enemy);
        }
        else
        {
            enemy.body.reset(Phaser.Math.Between(16, config.width - 16), -8);
            enemy.active = true;
        }   

        enemy.body.setVelocityY(gamePrefs.ENEMY_SPEED);
    }

    CreateBullet()
    {
        var bullet = this.bulletPool.getFirst(false);
        if(!bullet)
        {
            bullet = new BulletPrefab(this, this.ship.x, this.ship.body.top, "bullet");
            this.bulletPool.add(bullet);
        }
        else
        {
            bullet.body.reset(this.ship.x, this.ship.body.top);
            bullet.active = true;
        }

        bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);        
    }

    LoadAnimations()
    {
        this.anims.create(
            {
                key: "idle",
                frames: this.anims.generateFrameNumbers("ship", {start:0, end:1}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "goFast",
                frames: this.anims.generateFrameNumbers("ship", {start: 0, end: 1}),
                frameRate: 20,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "slowDown",
                frames: this.anims.generateFrameNumbers("ship", {start: 0, end: 1}),
                frameRate: 5,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "moveLeft",
                frames: this.anims.generateFrameNumbers("ship", {start: 2, end: 3}),
                frameRate: 10,
                repeat: -1
            }
        )

        this.anims.create(
            {
                key: "moveRight",
                frames: this.anims.generateFrameNumbers("ship", {start: 4, end: 5}),
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
    }

    //Actualiza whatever       
    update()
    {
        this.backgroundBack .tilePositionY -= .25;
        this.backgroundFront.tilePositionY --;

        this.movementX = 0;
        this.movementY = 0;                  
        
        this.InputMovement();

        this.PlayAnimations();

        if(this.movementX != 0 && this.movementY != 0){
            var velocity = Math.sqrt(Math.pow(this.movementX, 2) + Math.pow(this.movementY, 2));

            this.movementX /= velocity;
            this.movementY /= velocity;            
        }  

        this.ship.body.velocity.x += this.movementX;
        this.ship.body.velocity.y += this.movementY;

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

    PlayAnimations(){

        if(this.movementX != 0)
        {
            if(this.movementX > 0)
            {
                this.ship.anims.play("moveRight", true);
            }
            else
            {
                this.ship.anims.play("moveLeft", true);
            }
        }
        else if(this.movementY != 0)
        {
            if(this.movementY > 0)
            {
                this.ship.anims.play("slowDown", true);
            }
            else
            {
                this.ship.anims.play("goFast", true);
            }
        }
        else if(this.movementX == 0 && this.movementY == 0)
        {
            this.ship.anims.play("idle", true);
        }  
    }
}