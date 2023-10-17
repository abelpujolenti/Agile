class Ship extends Phaser.GameObjects.Sprite
{

    constructor(scene, positionX, positionY, explode)
    {
        super(scene, positionX, positionY, explode);
        scene.physics.add.existing(this);

        this._explode = explode;
    }

    TakeDamage(){};

}