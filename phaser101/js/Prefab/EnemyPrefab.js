class EnemyPrefab extends Ship
{
    constructor(scene, positionX, positionY, spriteTag = "enemy", player)
    {
        super(scene, positionX, positionY, spriteTag);
        scene.add.existing(this);
        this.anims.play("enemyIdle");
        this._health = 2;

        this._scene = scene;

        this._player = player;

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
            bullet.body.reset(this.x, this.body.bottom);
            bullet.visible = true;
            bullet.active = true;
        }

        bullet.body.setVelocityY(-gamePrefs.BULLET_SPEED);        

    }

    TakeDamage(bullet)
    {        
        console.log("hit enemy")
        this._health--;
        console.log(this._health)
        if(this._health <= 0)
        {
            this.body.enable = false;
            this.visible = false;
            this.active = false;
            this._health = 2;
        }
    }
}