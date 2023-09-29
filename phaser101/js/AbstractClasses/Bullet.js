class Bullet extends Phaser.GameObjects.Image
{
    constructor(scene, positionX, positionY, spriteTag = "bullet", target)
    {
        super(scene, positionX, positionY, spriteTag);
        scene.add.existing(this);
        
        this._bulletCollider = scene.physics.add.overlap(this, target, this.InflictDamage, null, this);        
    }

    Activate()
    {
        this._bulletCollider.active = true;
        this.active = true;
        this.visible = true;
    }

    Deactivate()
    {     
        this._bulletCollider.active = false;
        this.active = false;
        this.visible = false;
    }

    InflictDamage(bullet, target)
    {        
        bullet.Deactivate();        
        target.TakeDamage();
    }
}