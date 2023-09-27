class Bullet extends Phaser.GameObjects.Image
{
    constructor(scene, positionX, positionY, spriteTag = "bullet", target)
    {
        super(scene, positionX, positionY, spriteTag);
        scene.add.existing(this);
        
        scene.physics.add.overlap(this, target, this.InflictDamage, null, target);        
    }

    Deactivate()
    {     
        this.visible = false;
        this.active = false;
    }

    InflictDamage(bullet, target)
    {
        bullet.Deactivate();
        target.TakeDamage();
    }
}