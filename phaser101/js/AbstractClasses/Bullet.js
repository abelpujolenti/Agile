class Bullet extends Phaser.GameObjects.Image
{
    constructor(scene, positionX, positionY, spriteTag = "bullet", target, bulletTexture, flareTexture)
    {
        super(scene, positionX, positionY, spriteTag);
        scene.add.existing(this);

        this._scene = scene;

        /*this._bulletTexture = bulletTExture;
        this._flareTexture = flareTexture;*/
        
        
        this._bulletCollider = scene.physics.add.overlap(this, target, this.InflictDamage, null, this);        
    }

    Activate(textureName)
    {
        this.setTexture(textureName);
        this._bulletCollider.active = true;
        this.active = true;
        this.alpha = 1;
    }

    Deactivate()
    {   
        this._bulletCollider.active = false;   
        this.active = false;
    }

    Explode()
    {
        this.setTexture("flare");
        this.body.setVelocityY(gamePrefs.ENEMY_SPEED);
        this._bulletCollider.active = false;
        this._scene.tweens.add(
            {
                targets: this,
                alpha: {from: 1, to: 0},
                duration: 1000,
                onComplete: this.Deactivate.bind(this)
            }
        )
    }

    InflictDamage(bullet, target)
    {        
        bullet.Explode();        
        target.TakeDamage();
    }
}