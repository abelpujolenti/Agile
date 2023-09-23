class Ship extends Phaser.GameObjects.Sprite
{

    constructor(scene, positionX, positionY, spriteTag)
    {
        super(scene, positionX, positionY, spriteTag);
        scene.physics.add.existing(this);
    }

    TakeDamage(){};

}