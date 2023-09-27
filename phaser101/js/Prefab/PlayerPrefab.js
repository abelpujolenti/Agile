class PlayerPrefab extends Ship
{
    constructor(scene, positionX, positionY, spriteTag = "ship", shield, enemyPool)
    {
        super(scene, positionX, positionY, spriteTag);
        scene.add.existing(this);
        this._scene = scene;
        this._shield = shield;
        this._health = 5;
        this.shipBulletPool = scene.physics.add.group();
        this._enemyPool = enemyPool;
    }

    CreateBullet()
    {
        var bullet = this.shipBulletPool.getFirst(false);
        if(!bullet)
        {
            bullet = new PlayerBulletPrefab(this._scene, this.x, this.body.top, "bullet", this._enemyPool);
            this.shipBulletPool.add(bullet);
        }
        else
        {
            bullet.body.reset(this.x, this.body.top);
            bullet.visible = true;
            bullet.active = true;
        }

        bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);      
    }

    TakeDamage(bullet)
    {
        this._health--;
        if(this._health == 0)
        {
            this._scene.Restart();
            return;
        }
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