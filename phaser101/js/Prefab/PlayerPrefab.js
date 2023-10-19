class PlayerPrefab extends Ship
{
    constructor(scene, positionX, positionY, shield, enemyPool, playerShoot, playerHit, explode, powerUpSound)
    {
        super(scene, positionX, positionY, "player", explode);
        scene.add.existing(this);
        this._scene = scene;
        this._shield = shield;
        this._maxHealth = 5;
        this._health = this._maxHealth;
        this._shipBulletPool = scene.physics.add.group();
        this._enemyPool = enemyPool;
        this._playerShoot = playerShoot;
        this._playerHit = playerHit;
        this._powerUpSound = powerUpSound;

    }

    CreateBullet()
    {
        var bullet = this._shipBulletPool.getFirst(false);
        if(!bullet)
        {
            bullet = new PlayerBulletPrefab(this._scene, this.x, this.body.top, "bullet", this._enemyPool);
            this._shipBulletPool.add(bullet);
        }
        else
        {
            bullet.Activate("bullet");
            bullet.body.reset(this.x, this.body.top);
        }

        this._playerShoot.play();
        bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);      
    }

    TakePowerup(powerupNumber)
    {
        if(powerupNumber == 1)
        {            
            var delayShoot = 200
            this.autoShootTimer = this._scene.time.addEvent
            (
                {
                    delay: delayShoot,
                    callback: this.CreateBullet,
                    callbackScope: this,
                    repeat: 10000 / delayShoot
                }
            );
        }
        else if(powerupNumber == 2)
        {
            this._health = this._maxHealth;
            this._shield.setFrame(this._health - 1);
        }
    }

    TakeDamage()
    {
        this._health--;
        if(this._health == 0)
        {
            this._explode.play();
            this._scene.LoadGameOver();
            return;
        }
        this._playerHit.play();
        this._shield.setFrame(this._health - 1);
    }

    PlayAnimations(movementX, movementY)
    {

        if(movementX != 0)
        {
            if(movementX > 0)
            {
                this.anims.play("moveRight", true);
            }
            else
            {
                this.anims.play("moveLeft", true);
            }
        }
        else if(movementY != 0)
        {
            if(movementY > 0)
            {
                this.anims.play("slowDown", true);
            }
            else
            {
                this.anims.play("goFast", true);
            }
        }
        else if(movementX == 0 && movementY == 0)
        {
            this.anims.play("idle", true);
        }  
    }
}