class EnemyPrefab extends Ship
{
    constructor(scene, positionX, positionY, spriteTag = "enemy", player, enemyShoot, enemyHit, explode)
    {
        super(scene, positionX, positionY, spriteTag, explode);
        scene.add.existing(this);
        this.anims.play("enemyIdle");
        this._health = 2;

        this._scene = scene;
        this._player = player;
        this._enemyShoot = enemyShoot;
        this._enemyHit = enemyHit;

        this._powerUpPool = scene.physics.add.group();

        this.bulletPool = this._scene.physics.add.group();
        this.shootTimer = this._scene.time.addEvent
        (
            {                
                delay: 3100, 
                callback: this.Shoot,
                callbackScope: this,
                loop: true
            }
        )
    }    

    preUpdate(time, delta)
    {               
        if(this._health <= 0 || this.y >= config.height + 8)
        {            
            this.active = false;
        }
        super.preUpdate(time, delta);
    }

    Shoot()
    {
        if(!this.active)
        {
            return;
        }

        var bullet = this.bulletPool.getFirst(false);

        if(!bullet)
        {
            bullet = new SimpleEnemyBulletPrefab(this._scene, this.x, this.body.bottom, "enemyBullet", this._player);
            this.bulletPool.add(bullet);
        }
        else
        {
            bullet.Activate();
            bullet.body.reset(this.x, this.body.bottom);
        }

        this._enemyShoot.play();
        bullet.body.setVelocityY(-gamePrefs.BULLET_SPEED);        

    }

    TakeDamage(bullet)
    {        
        this._health--;
        if(this._health <= 0)
        {
            this.body.enable = false;
            this.visible = false;
            this.active = false;
            this._health = 2;
            this._explode.play()
            //this.anims.play("explosion", true);
            if(true/*Phaser.Math.Between(0, 9) == 1*/){     
                this.CreatePowerUps(Phaser.Math.Between(1, 2), this.x, this.y);                
            }
            return;
        }
        this._enemyHit.play()
    }    

    CreatePowerUps(powerUpNumber, posX, posY)
    {
        var powerUpAvailable = false;

        var powerUp;        

        this._powerUpPool.getChildren().every(powerUp => {
            if(!powerUp.active && powerUp.GetPowerUpNumber() != powerUpNumber)
            {
                powerUp.body.reset(posX, posY);
                powerUp.body.enable = true;
                powerUp.visible = true;
                powerUp.active = true;
                powerUpAvailable = true;
                return false;
            }
            return true;
        });

        if(!powerUpAvailable)
        {
            powerUp = new PowerUp(this._scene, posX, posY, this._player, powerUpNumber);
            this._powerUpPool.add(powerUp);            
        }  

        powerUp.body.setVelocityY(gamePrefs.ENEMY_SPEED);
    }
}