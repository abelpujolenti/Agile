class Ship extends Phaser.GameObjects.Sprite
{

    constructor(scene, positionX, positionY, spriteTag, explode)
    {
        super(scene, positionX, positionY, spriteTag, explode);
        scene.physics.add.existing(this);

        this._explode = explode;
    }

    TakeDamage(){};

}