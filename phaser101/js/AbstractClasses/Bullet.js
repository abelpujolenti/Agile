class Bullet extends Phaser.GameObjects.Image
{
    constructor(scene, positionX, positionY, spriteTag = "bullet", target)
    {
        super(scene, positionX, positionY, spriteTag);
        scene.add.existing(this);
        this._target = target;     
        
        scene.physics.add.overlap(this, target, target.TakeDamage, null, scene);        
    }

    Deactivate()
    {
        this.visible = false;
        this.active = false;
    }

    CheckCollision()
    {                
        return this.body.touching.none;
    }

    TakeDamage(){}
}